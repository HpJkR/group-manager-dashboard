import express from "express"

export interface ContextType {
	req: express.Request
	res: express.Response
}
