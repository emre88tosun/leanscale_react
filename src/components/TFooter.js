/*
 * File: TFooter.js
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
const { Footer } = Layout;

const TFooter = () => {
	return (
		<Footer
			style={{
				textAlign: "center",
			}}
		>
			Plates Co. © 2022 Created by Emre Tosun
		</Footer>
	);
};

export default TFooter;
