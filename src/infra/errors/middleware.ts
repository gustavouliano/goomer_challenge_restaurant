import { NextFunction, Request, Response } from "express";
import LoggerProvider from "../provider/LoggerProvider";
import AppError from "./AppError";

export default function (err: Error, req: Request, res: Response, next: NextFunction) {
    let statusCode = 500;
    if (err instanceof AppError){
        LoggerProvider.getInstance().warn(err.message);
        statusCode = err.statusCode;
    }
    else{
        LoggerProvider.getInstance().error(err.message);
    }
    return res.status(statusCode).json({
        message: err.message
    });
}