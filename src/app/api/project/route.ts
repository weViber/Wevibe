import prisma from '@/libs/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, nonFunctionState } = body;
    const {
      projectCategory,
      projectField,
      projectProgressClassification,
      planningStatus,
      detailedPlanningStatus,
      detailedPlanningText,
      referenceMaterials,
      projectTitle,
      detailedTaskDescription,
      relatedTechnologies,
      availableBudget,
      budgetNegotiable,
      expectedStartDate,
      startDateNegotiable,
      expectedEndDate,
      endDateNegotiable,
      expectedDuration,
      durationNegotiable,
      preMeetingMethod,
      meetingMethod,
      meetingFrequency,
      clientLocationCity,
      clientLocationDistrict,
      applicationDeadline,
      isFundingAvailable,
      isFundingAvailableSub,
      applicantRequirements,
      applicantRequirementsSub,
      preliminaryVerificationQuestions,
      collaborationTeamComposition,
      isCollaborationTeamComposition,
      itProjectManagementExperience,
      futurePlans,
      projectPriorityFirst,
      projectPrioritySecond,
      projectPriorityThird,
      interestedProducts,
    } = nonFunctionState;

    console.log(nonFunctionState);
    const response = await prisma.project.create({
      data: {
        userId,
        projectCategory: JSON.stringify(projectCategory),
        projectField: JSON.stringify(projectField),
        projectProgressClassification,
        planningStatus,
        detailedPlanningStatus: JSON.stringify(detailedPlanningStatus),
        detailedPlanningText,
        referenceMaterials: JSON.stringify(referenceMaterials),
        projectTitle,
        detailedTaskDescription,
        relatedTechnologies: JSON.stringify(relatedTechnologies),
        availableBudget,
        budgetNegotiable,
        expectedStartDate,
        startDateNegotiable,
        expectedEndDate,
        endDateNegotiable,
        expectedDuration,
        durationNegotiable,
        preMeetingMethod,

        meetingMethod,
        meetingFrequency,
        clientLocationCity,
        clientLocationDistrict,

        applicationDeadline,
        isFundingAvailable,
        isFundingAvailableSub,

        applicantRequirements: JSON.stringify(applicantRequirements),
        applicantRequirementsSub: JSON.stringify(applicantRequirementsSub),

        preliminaryVerificationQuestions,

        collaborationTeamComposition,
        isCollaborationTeamComposition,

        itProjectManagementExperience,
        futurePlans: JSON.stringify(futurePlans),
        projectPriorityFirst,
        projectPrioritySecond,
        projectPriorityThird,
        interestedProducts: JSON.stringify(interestedProducts),
      },
    });
    console.log(response);
    return NextResponse.json({ message: '완료', status: 200 });
  } catch (error) {
    return NextResponse.error();
  }
}
