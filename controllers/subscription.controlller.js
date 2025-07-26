
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
        console.log('Workflow trigger attempted:',response);
        
        if(!response.workflowRunId) return  console.log("Workflow trigger response:", response);
       

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
        if (req.user.id != req.params.id) {
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
        const { id } = req.params;
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

        res.status(200).json({
            success: true,
            message: "Subscription updated successfully",
            data: updatedSubscription
        });
    } catch (error) {
        // Handle validation errors
        if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map(err => err.message);
            const validationError = new Error(validationErrors.join(', '));
            validationError.statusCode = 400;
            return next(validationError);
        }
        next(error);
    }
};

// Delete subscription by ID
export const deleteSubscription = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Find subscription and verify ownership
        const subscription = await Subscription.findById(id);
        
        if (!subscription) {
            const error = new Error("Subscription not found");
            error.statusCode = 404;
            throw error;
        }

        // Check if user owns this subscription
        if (subscription.user.toString() !== req.user._id.toString()) {
            const error = new Error("You are not authorized to delete this subscription");
            error.statusCode = 403;
            throw error;
        }

        // Cancel workflow if exists
        if (subscription.workflowRunId) {
            try {
                await workflowClient.cancel({
                    workflowRunId: subscription.workflowRunId
                });
                console.log('Workflow cancelled for subscription:', id);
            } catch (workflowError) {
                console.error('Error cancelling workflow:', workflowError);
                // Continue with deletion even if workflow cancellation fails
            }
        }

        // Delete subscription
        await Subscription.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Subscription deleted successfully",
            data: null
        });
    } catch (error) {
        next(error);
    }
};

// Get all subscriptions for a specific user
export const getUserSubscriptionsById = async (req, res, next) => {
    try {
        const { id } = req.params;

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

// Cancel subscription (change status to cancelled)
export const cancelSubscription = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Find subscription and verify ownership
        const subscription = await Subscription.findById(id);
        
        if (!subscription) {
            const error = new Error("Subscription not found");
            error.statusCode = 404;
            throw error;
        }

        // Check if user owns this subscription
        if (subscription.user.toString() !== req.user._id.toString()) {
            const error = new Error("You are not authorized to cancel this subscription");
            error.statusCode = 403;
            throw error;
        }

        // Check if subscription is already cancelled or expired
        if (subscription.status === 'cancelled') {
            const error = new Error("Subscription is already cancelled");
            error.statusCode = 400;
            throw error;
        }

        // Cancel workflow if exists
        if (subscription.workflowRunId) {
            try {
                await workflowClient.cancel({
                    workflowRunId: subscription.workflowRunId
                });
                console.log('Workflow cancelled for subscription:', id);
            } catch (workflowError) {
                console.error('Error cancelling workflow:', workflowError);
                // Continue with cancellation even if workflow cancellation fails
            }
        }

        // Update subscription status to cancelled
        const cancelledSubscription = await Subscription.findByIdAndUpdate(
            id,
            { 
                status: 'cancelled',
                workflowRunId: null // Clear workflow ID
            },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Subscription cancelled successfully",
            data: cancelledSubscription
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
