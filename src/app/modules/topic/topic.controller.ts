import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { TopicService } from "./topic.service";
import httpStatus from "http-status";

const createTopic = catchAsync(async (req, res) => {
  const { lessonId } = req.params;
  const result = await TopicService.createTopic(lessonId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Topic created successfully",
    data: result,
  });
});

const getAllTopics = catchAsync(async (req, res) => {
  const result = await TopicService.getAllTopics();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Topics retrieved successfully",
    data: result,
  });
});

const getSingleTopic = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await TopicService.getSingleTopic(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Topic retrieved successfully",
    data: result,
  });
});

const deleteTopic = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await TopicService.deleteTopic(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Topic deleted successfully",
    data: result,
  });
});

export const TopicController = {
  createTopic,
  getAllTopics,
  getSingleTopic,
  deleteTopic,
};
