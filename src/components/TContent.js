/*
 * File: TContent.js
 * Project: leanscale_react
 * Author: Emre Tosun (emre@emretosun.dev)
 * -----
 * Last Modified: 2022
 * Modified By: Emre Tosun (emre@emretosun.dev)
 * -----
 * Copyright 2022 - 2022 Emre Tosun
 */
import React from "react";
import { Layout } from "antd";

const { Content } = Layout;

const TContent = ({ children }) => {
	return (
		<Content
			style={{
				padding: "16px 50px",
			}}
		>
			<div className="site-layout-content">{children}</div>
		</Content>
	);
};

export default TContent;
