<?php

namespace App\Enums;

enum NotificationType: string
{
    // Assignment
    case AssignmentCreated = 'assignment.created';
    case AssignmentUpdated = 'assignment.updated';
    case AssignmentDeleted = 'assignment.deleted';
    case AssignmentGraded = 'assignment.graded';

    // Submission
    case SubmissionSubmitted = 'submission.submitted';

    // Discussion
    case QuestionPosted = 'question.posted';
    case QuestionAnswered = 'question.answered';
    case AnswerAccepted = 'answer.accepted';

    // Resources
    case ResourceUploaded = 'resource.uploaded';
    case ResourceUpdated = 'resource.updated';

    // Institution
    case AnnouncementPublished = 'announcement.published';
    case StudentEnrolled = 'enrollment.joined';
    case TeacherAssigned = 'teacher.assigned';

    // Grievance
    case GrievanceSubmitted = 'grievance.submitted';
    case GrievanceStatusUpdated = 'grievance.status_updated';
    case GrievanceAssigned = 'grievance.assigned';
    case GrievanceUpvoted = 'grievance.upvoted';
    case GrievanceCommentAdded = 'grievance.comment_added';
    case GrievanceMilestoneReached = 'grievance.milestone_reached';

    /**
     * Human-readable label for the notification type.
     */
    public function label(): string
    {
        return match ($this) {
            self::AssignmentCreated => 'New Assignment',
            self::AssignmentUpdated => 'Assignment Updated',
            self::AssignmentDeleted => 'Assignment Deleted',
            self::AssignmentGraded => 'Assignment Graded',
            self::SubmissionSubmitted => 'New Submission',
            self::QuestionPosted => 'New Question',
            self::QuestionAnswered => 'Question Answered',
            self::AnswerAccepted => 'Answer Accepted',
            self::ResourceUploaded => 'New Resource',
            self::ResourceUpdated => 'Resource Updated',
            self::AnnouncementPublished => 'New Announcement',
            self::StudentEnrolled => 'Student Enrolled',
            self::TeacherAssigned => 'Teacher Assigned',
            self::GrievanceSubmitted => 'New Grievance',
            self::GrievanceStatusUpdated => 'Grievance Updated',
            self::GrievanceAssigned => 'Grievance Assigned',
            self::GrievanceUpvoted => 'Grievance Upvoted',
            self::GrievanceCommentAdded => 'New Comment',
            self::GrievanceMilestoneReached => 'Milestone Reached',
        };
    }

    /**
     * Group category for filtering in the UI.
     */
    public function category(): string
    {
        return match ($this) {
            self::AssignmentCreated, self::AssignmentUpdated, self::AssignmentDeleted, self::AssignmentGraded, self::SubmissionSubmitted => 'assignments',
            self::QuestionPosted, self::QuestionAnswered, self::AnswerAccepted => 'discussions',
            self::ResourceUploaded, self::ResourceUpdated => 'resources',
            self::AnnouncementPublished => 'announcements',
            self::StudentEnrolled, self::TeacherAssigned => 'institution',
            self::GrievanceSubmitted, self::GrievanceStatusUpdated, self::GrievanceAssigned, self::GrievanceUpvoted, self::GrievanceCommentAdded, self::GrievanceMilestoneReached => 'grievances',
        };
    }
}
