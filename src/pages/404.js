/*
 * File: 404.js
 * Project: leanscale_react
 * Author: Emre Tosun (emre@emretosun.dev)
 * -----
 * Last Modified: 2022
 * Modified By: Emre Tosun (emre@emretosun.dev)
 * -----
 * Copyright 2022 - 2022 Emre Tosun
 */
import React from "react";
import { Button, Result } from "antd";
import { NavLink } from "react-router-dom";

const Error404 = () => {
	return (
		<>
			<Result
				status="404"
				title="404"
				subTitle="Sorry, the page you visited does not exist."
				extra={
					<Button type="primary">
						<NavLink to="/">Back Home</NavLink>
					</Button>
				}
			/>
		</>
	);
};

export default Error404;
