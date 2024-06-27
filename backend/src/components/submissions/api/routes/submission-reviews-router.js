/**
 * @author  Valeria Molina Recinos
 * for mods to approve or reject user submissions
 */

// const express = require('express');
// const router = express.Router();
// const permissions = require('../../../../libraries/constants/permissions');
// const userSubmissionService = require('../../service/');
// const polishService = require('../services/polishService');
// const logger = require('../config/logger');
// const {
//     authenticateToken,
//     authorize,
// } = require('../middleware/authMiddleware');

// TODO: REWORK THIS FILE

/**
 * Approve a user submission
 * Only a moderator or admin can approve a user submission
 */
// router.put(
//     '/api/approveSubmission',
//     authenticateToken,
//     authorize(permissions.MANAGE_POLISH_SUBMISSIONS),
//     async (req, res) => {
//         // after human review, approve the user submission
//         const { submissionId } = req.query;
//         logger.info(
//             `Received request to approve dupe submission id: ${submissionId}`
//         );
//         // find the user submission in table, if it doesn't exist
//         // then return an error message
//         const findSubmission =
//             await userSubmissionService.findUserSubmissionById(submissionId);
//         if (!findSubmission) {
//             logger.error(`Submission not found for id: ${submissionId}`);
//             return res.status(400).json({ error: 'Submission not found' });
//         } else {
//             logger.info(`Approving submission id: ${submissionId}`);
//             const polishId = findSubmission.polish_id;
//             const dupeId = findSubmission.similar_to_polish_id;
//             // add the dupe to the submitted polishes array
//             const linkDupeMain = await polishService.addDupePolishId(
//                 polishId,
//                 dupeId
//             );
//             const linkDupeSecondary = await polishService.addDupePolishId(
//                 dupeId,
//                 polishId
//             );
//             // update user submission to be approved
//             const approveUserSubmission =
//                 await userSubmissionService.approveUserSubmission(submissionId);
//             res.status(200).json(
//                 approveUserSubmission,
//                 linkDupeMain,
//                 linkDupeSecondary
//             );
//         }
//     }
// );

// /**
//  * Reject a user submission
//  * Only mods or admins can perform this action
//  */
// router.put(
//     '/api/rejectSubmission',
//     authenticateToken,
//     authorize(permissions.MANAGE_POLISH_SUBMISSIONS),
//     async (req, res) => {
//         // after human review, reject the user submission
//         const { submissionId } = req.query;
//         logger.info(
//             `Received request to reject dupe submission id: ${submissionId}`
//         );
//         // find the user submission in table, if it doesn't exist
//         const findSubmission =
//             await userSubmissionService.findUserSubmissionById(submissionId);
//         if (!findSubmission) {
//             logger.error(`Submission not found for id: ${submissionId}`);
//             return res.status(400).json({ error: 'Submission not found' });
//         } else {
//             logger.info(`Rejecting submission id: ${submissionId}`);
//             // update user submission to be rejected
//             const rejectUserSubmission =
//                 await userSubmissionService.rejectUserSubmission(submissionId);
//             res.status(200).json(rejectUserSubmission);
//         }
//     }
// );

// module.exports = router;
