
import { SERVER_URL } from '../config/env.js'
import { workflowClient } from '../config/upstash.js'
import Subscription from '../models/subscription.models.js'

export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id,
        })

        const response = await workflowClient.trigger({
            url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
            body: {
                subscriptionId: subscription.id,
            },
            headers: {
                "content-type": "application/json"
            },
            retries: 0,
        });
        console.log('Workflow trigger attempted:', response);

        if (!response.workflowRunId) return console.log("Workflow trigger response:", response);


        if (response) {
            subscription.workflowRunId = response.workflowRunId;
            await subscription.save();
            // ✅ Save updated subscription
        }
        res.status(201).json(subscription)
    } catch (error) {
        next(error)
    }
}

export const getUserSubscriptions = async (req, res, next) => {

    try {
        if (req.user.id != req.params) {
            const error = new Error('You are not then owner of this account ');
            error.status = 401;
            throw error;
        }
        const subscriptions = await Subscription.find({ user: req.params.id })

        res.status(200).json({ success: true, data: subscriptions })
    } catch (error) {
        next(error)
    }
}

export const getAllSubscriptions = async (req, res, next) => {
    try {
        // Ensure user is authenticated and req.user is available
        const userId = req.user._id;

        const subscriptions = await Subscription.find({ user: userId });

        res.status(200).json({
            success: true,
            count: subscriptions.length,
            data: subscriptions,
        });
    } catch (error) {
        next(error); // Passes error to global error handler
    }
};
// Update subscription by ID
export const updateSubscription = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updateData = req.body;

        // Find subscription and verify ownership
        const subscription = await Subscription.findById(id);

        if (!subscription) {
            const error = new Error("Subscription not found");
            error.statusCode = 404;
            throw error;
        }

        // Check if user owns this subscription
        if (subscription.user.toString() !== req.user._id.toString()) {
            const error = new Error("You are not authorized to update this subscription");
            error.statusCode = 403;
            throw error;
        }

        // Update subscription
        const updatedSubscription = await Subscription.findByIdAndUpdate(
            id,
            { $set: updateData },
            {
                new: true,
                runValidators: true
            }
        );
        if (updatedSubscription) {
            const renewalPeriods = {
                daily: 1,
                monthly: 30,
                yearly: 365,
            };

            if (updatedSubscription.startDate && updatedSubscription.frequency) {
                const newRenewalDate = new Date(updatedSubscription.startDate);
                newRenewalDate.setDate(
                    newRenewalDate.getDate() + renewalPeriods[updatedSubscription.frequency]
                );
                updatedSubscription.renewalDate = newRenewalDate;

                // Update status if renewalDate is in the past
                if (updatedSubscription.renewalDate < new Date()) {
                    updatedSubscription.status = "expired";
                } else {
                    updatedSubscription.status = "active";
                }

                await updatedSubscription.save();
            }
        }

        // ✅ Trigger workflow again
        const response = await workflowClient.trigger({
            url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
            body: {
                subscriptionId: updatedSubscription._id,
            },
            headers: {
                "content-type": "application/json",
            },
            retries: 0,
        });

        console.log("Workflow trigger response:", response);

        if (response?.workflowRunId) {
            console.log("✅ Workflow triggered:", response.workflowRunId);
            updatedSubscription.workflowRunId = response.workflowRunId;
            await updatedSubscription.save();
        }

        res.status(200).json({
            success: true,
            message: "Subscription updated and workflow re-triggered.",
            data: updatedSubscription,
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            const validationErrors = Object.values(error.errors).map(
                (err) => err.message
            );
            const validationError = new Error(validationErrors.join(", "));
            validationError.statusCode = 400;
            return next(validationError);
        }
        next(error);
    }
};

// Delete subscription by ID
export const deleteSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findByIdAndDelete(req.params.id);

        if (!subscription) {
            const error = new Error("Subscription not found");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            message: "Subscription deleted successfully",
            data: subscription,
        });
    } catch (error) {
        next(error);
    }
};
// Get all subscriptions for a specific user
export const getUserSubscriptionsById = async (req, res, next) => {
    try {
        const id = req.params.id;


        // Check if requesting user is the owner or has admin privileges
        if (req.user._id.toString() !== id) {
            const error = new Error('You are not authorized to view these subscriptions');
            error.statusCode = 403;
            throw error;
        }

        const subscriptions = await Subscription.find({ user: id })
            .populate('user', 'name email')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: subscriptions.length,
            data: subscriptions
        });
    } catch (error) {
        next(error);
    }
};

/// PUT cancel subscription of a user
export const cancelSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);
        if (!subscription) {
            const error = new Error("Subscription not found");
            error.statusCode = 404;
            throw error;
        }

        // check if user is the owner of the subscription
        if (subscription.user.toString() !== req.user.id) {
            const error = new Error("You are not the owner of this subscription");
            error.statusCode = 401;
            throw error;
        }

        // set status to cancelled
        subscription.status = "cancelled";
        await subscription.save();

        res.status(200).json({
            success: true,
            message: "Subscription cancelled successfully",
            data: subscription,
        });
    } catch (error) {
        next(error);
    }
};

// Get upcoming renewals for the authenticated user
export const getUpcomingRenewals = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { days = 7 } = req.query; // Default to 7 days

        // Calculate date range
        const today = new Date();
        const futureDate = new Date();
        futureDate.setDate(today.getDate() + parseInt(days));

        // Find subscriptions with renewal dates in the specified range
        const upcomingRenewals = await Subscription.find({
            user: userId,
            status: 'active',
            renewalDate: {
                $gte: today,
                $lte: futureDate
            }
        }).sort({ renewalDate: 1 });

        res.status(200).json({
            success: true,
            count: upcomingRenewals.length,
            days: parseInt(days),
            data: upcomingRenewals
        });
    } catch (error) {
        next(error);
    }
};
