"use client";

import { Colors } from "@/utils";
import { Add } from "@mui/icons-material";
import {
	Box,
	Button,
	Checkbox,
	FormControlLabel,
	Grid,
	Input,
	Rating,
	ToggleButtonGroup,
	ToggleButton,
	Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";

const validationSchema = yup.object({
	text: yup.string().required("متن نظر الزامی میباشد."),
});

const BlogSendComment = ({ handleSendComment }) => {
	const [seleted, setSelected] = useState(0);
	const [rate, setRate] = useState(1);

	const handleSelect = (event, value) => {
		setSelected(value);
	};

	const formik = useFormik({
		initialValues: {
			text: "",
			anonymous: false,
		},
		onSubmit: (values) => {
			handleSendComment({
				anonymous: values.anonymous,
				text: values.text,
				seleted: seleted,
				rate: rate,
			});

			formik.resetForm();
			setSelected(0);
			setRate(1);
		},
		validationSchema,
	});

	return (
		<Grid
			display='flex'
			flexDirection='column'
			rowGap={4}
        >
			<Grid
				item
				xs={12}
				sm={12}
				md={8}
				lg={8}
				display="flex"
				flexDirection="column"
				alignItems="center">
				<Typography
					align="left"
					variant="h6"
					fontWeight={800}>
					{"ثبت نظر"}
				</Typography>
				<Grid
					display="flex"
					direction="column"
					alignItems="center"
					justifyContent="center"
					sx={{
						mt: 3,
						width: { xs: 320, sm: 590 },
						pt: 2,
						pb: 4,
						borderRadius: 5,
						bgcolor: "#F9F9F9",
					}}>
					<Box
						display="flex"
						justifyContent="space-between"
						sx={{ width: { xs: 310, sm: 570 } }}>
						<Box
							display="flex"
							pt={1.3}
							flexDirection="row">
							<Add fontSize="medium" />
							<Typography ml={1}>{"نظر شما"}</Typography>
						</Box>
						<FormControlLabel
							control={
								<Checkbox
									name="anonymous"
									id="anonymous"
									onChange={formik.handleChange}
								/>
							}
							label="ارسال نظر به صورت ناشناس."
						/>
						<Box />
					</Box>
					<Input
						id="text"
						name="text"
						placeholder="دیدگاه"
						value={formik.values.text}
						onChange={formik.handleChange}
						multiline
						rows={3}
						fullWidth
						disableUnderline
						required
						sx={{
							mt: 1,
							bgcolor: "#EEEEEE",
							height: { xs: 80, sm: 90 },
							width: { xs: 300, sm: 550 },
							borderRadius: 3,
							padding: 3,
						}}
						error={formik.errors.text && formik.touched.text}
					/>
					{formik.errors.text && formik.touched.text && (
						<Typography
							color="#ff0000"
							sx={{ border: "0.05em solid", mt: 2, borderRadius: 3, p: 1 }}>
							{"لطفا متن دیدگاه خود را وارد کنید."}
						</Typography>
					)}
				</Grid>
			</Grid>
			<Grid
				item
				xs={12}
				sm={12}
				md={4}
				lg={4}
				display="flex"
				flexDirection="column"
				alignItems="center">
				<Typography
					sx={{ mt: { sm: 4, xs: 4, md: 0 } }}
					variant="h6"
					fontWeight={800}>
					{"امتیازدهی"}
				</Typography>
				<Box mt={4.5}>
					<Box
						display="flex"
						flexDirection="row"
						justifyContent="space-between">
						<Box
							display="flex"
							flexDirection="column"
							alignItems="center">
							<Rating
								id="rate"
								name="rate"
								value={rate}
								defaultValue={1}
								precision={1}
								onChange={(e, r) => setRate(r)}
								icon={
									<svg
										style={{ marginRight: 7, marginLeft: 7 }}
										width="33"
										height="33"
										viewBox="0 0 33 33"
										fill="none"
										xmlns="http://www.w3.org/2000/svg">
										<path
											d="M7.3117 9.982C3.5192 10.8407 1.62295 11.2693 1.17125 12.72C0.721078 14.1692 2.013 15.6815 4.59837 18.7047L5.26745 19.4864C6.00129 20.3451 6.36975 20.7752 6.5347 21.3055C6.69966 21.8374 6.64416 22.4109 6.53316 23.5564L6.43141 24.6001C6.04137 28.6346 5.84558 30.6511 7.0265 31.5468C8.20741 32.4441 9.98341 31.6255 13.5323 29.9913L14.4527 29.5689C15.461 29.1033 15.9651 28.872 16.5 28.872C17.035 28.872 17.5391 29.1033 18.5489 29.5689L19.4662 29.9913C23.0167 31.6255 24.7927 32.4425 25.972 31.5484C27.1545 30.6511 26.9587 28.6346 26.5687 24.6001M28.4017 18.7047C30.9871 15.6831 32.279 14.1707 31.8288 12.72C31.3771 11.2693 29.4809 10.8392 25.6884 9.982L24.7079 9.76C23.6302 9.51641 23.0922 9.39462 22.659 9.06625C22.2273 8.73787 21.9498 8.23991 21.3948 7.244L20.8892 6.3375C18.9359 2.83483 17.96 1.0835 16.5 1.0835C15.0401 1.0835 14.0642 2.83483 12.1109 6.3375"
											fill="#FFCC70"
										/>
										<path
											d="M7.3117 9.982C3.5192 10.8407 1.62295 11.2693 1.17125 12.72C0.721078 14.1692 2.013 15.6815 4.59837 18.7047L5.26745 19.4864C6.00129 20.3451 6.36975 20.7752 6.5347 21.3055C6.69966 21.8374 6.64416 22.4109 6.53316 23.5564L6.43141 24.6001C6.04137 28.6346 5.84558 30.6511 7.0265 31.5468C8.20741 32.4441 9.98341 31.6255 13.5323 29.9913L14.4527 29.5689C15.461 29.1033 15.9651 28.872 16.5 28.872C17.035 28.872 17.5391 29.1033 18.5489 29.5689L19.4662 29.9913C23.0167 31.6255 24.7927 32.4425 25.972 31.5484C27.1545 30.6511 26.9587 28.6346 26.5687 24.6001M7.3117 9.982L8.5 9.76L10.5 9.06625L11.5 7.244L12.1109 6.3375M7.3117 9.982L26.5687 24.6001M7.3117 9.982L28.4017 18.7047M26.5687 24.6001V23.5564L27 21.3055L28 19.4864L28.4017 18.7047M28.4017 18.7047C30.9871 15.6831 32.279 14.1707 31.8288 12.72C31.3771 11.2693 29.4809 10.8392 25.6884 9.982L24.7079 9.76C23.6302 9.51641 23.0922 9.39462 22.659 9.06625C22.2273 8.73787 21.9498 8.23991 21.3948 7.244L20.8892 6.3375C18.9359 2.83483 17.96 1.0835 16.5 1.0835C15.0401 1.0835 14.0642 2.83483 12.1109 6.3375M28.4017 18.7047L12.1109 6.3375M10.5 10.5L13 8.5L14.4527 10.5L12.5 11L12.1109 9.982H13L11.5 11L16 12.72L17 12L15.5 11H14.4527L21.3948 15L15.5 14.5L23 18L27 20L24.7079 18L25.3132 22.5M25.3132 22.5L25.972 23L27.5 19L12.1109 7.244L9.5 10.5L25.3132 22.5ZM26.5687 20H25.6884L25.972 21L19.4662 17L12.5 18"
											stroke="#FFCC70"
											stroke-width="1.5"
											stroke-linecap="round"
										/>
									</svg>
								}
								emptyIcon={
									<svg
										style={{ marginRight: 7, marginLeft: 7 }}
										width="33"
										height="33"
										viewBox="0 0 33 33"
										fill="none"
										xmlns="http://www.w3.org/2000/svg">
										{" "}
										<path
											d="M7.3117 9.982C3.5192 10.8407 1.62295 11.2693 1.17125 12.72C0.721078 14.1692 2.013 15.6815 4.59837 18.7047L5.26745 19.4864C6.00129 20.3451 6.36974 20.7752 6.5347 21.3055C6.69966 21.8374 6.64416 22.4109 6.53316 23.5564L6.43141 24.6001C6.04137 28.6346 5.84558 30.6511 7.0265 31.5468C8.20741 32.4441 9.98341 31.6255 13.5323 29.9913L14.4527 29.5689C15.461 29.1033 15.9651 28.872 16.5 28.872C17.035 28.872 17.5391 29.1033 18.5489 29.5689L19.4662 29.9913C23.0167 31.6255 24.7927 32.4425 25.972 31.5484C27.1545 30.6511 26.9587 28.6346 26.5687 24.6001M28.4017 18.7047C30.9871 15.6831 32.279 14.1707 31.8288 12.72C31.3771 11.2693 29.4809 10.8392 25.6884 9.982L24.7079 9.76C23.6302 9.51641 23.0922 9.39462 22.659 9.06625C22.2273 8.73787 21.9498 8.23991 21.3948 7.244L20.8892 6.3375C18.9359 2.83483 17.96 1.0835 16.5 1.0835C15.0401 1.0835 14.0642 2.83483 12.1109 6.3375"
											stroke="#213346"
											stroke-width="1.5"
											stroke-linecap="round"
										/>{" "}
									</svg>
								}
							/>
							<Box
								mt={2}
								width={198}
								display="flex"
								justifyContent="space-between">
								{["۱", "۲", "۳", "۴", "۵"].map((key) => {
									return (
										<Typography sx={{ fontWeight: "bold" }}>{key}</Typography>
									);
								})}
							</Box>
						</Box>
					</Box>
					<Box mt={1.5}>
						<ToggleButtonGroup
							orientation="vertical"
							value={seleted}
							exclusive
							onChange={handleSelect}
							sx={{
								"& .MuiToggleButtonGroup-grouped": {
									border: 0,
								},
							}}>
							<ToggleButton
								color="success"
								value={1}
								sx={{
									display: "flex",
									justifyContent: "start",
									"& selected": {
										bgcolor: "#FFFFFF",
										color: "#FFFFFF",
									},
								}}>
								<svg
									width="18"
									height="18"
									viewBox="0 0 18 18"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path
										d="M1.5 7.52818L2.1225 7.47485C2.10815 7.31478 2.0327 7.16639 1.9118 7.06049C1.79091 6.9546 1.63387 6.89935 1.4733 6.90621C1.31273 6.91308 1.16098 6.98153 1.04957 7.09736C0.938149 7.21318 0.875632 7.36747 0.875 7.52818H1.5ZM15.8633 9.04735L15.275 12.4473L16.5075 12.6607L17.095 9.26068L15.8633 9.04735ZM10.0375 16.7082H6.16333V17.9582H10.0375V16.7082ZM5.40417 16.0107L4.7275 8.18318L3.48167 8.29068L4.15917 16.1182L5.40417 16.0107ZM15.275 12.4473C14.8525 14.889 12.6508 16.7082 10.0375 16.7082V17.9582C13.2258 17.9582 15.9758 15.734 16.5075 12.6607L15.275 12.4473ZM10.0458 3.24985L9.49333 6.62068L10.7267 6.82235L11.2792 3.45235L10.0458 3.24985ZM4.99 7.53818L6.18917 6.50485L5.3725 5.55818L4.175 6.59152L4.99 7.53818ZM8.37 3.14318L8.76667 1.61485L7.55667 1.30152L7.16 2.82902L8.37 3.14318ZM9.365 1.31485L9.48583 1.35402L9.86833 0.164017L9.7475 0.124851L9.365 1.31485ZM7.76917 4.67985C8.02948 4.19318 8.23116 3.67735 8.37 3.14318L7.16 2.82902C7.04607 3.26788 6.88047 3.69168 6.66667 4.09152L7.76917 4.67985ZM9.48583 1.35402C9.60474 1.39005 9.71261 1.45554 9.79944 1.54441C9.88626 1.63328 9.94923 1.74264 9.9825 1.86235L11.1925 1.54902C11.1064 1.22527 10.9398 0.928543 10.7083 0.686403C10.4768 0.444264 10.1879 0.264569 9.86833 0.164017L9.48583 1.35402ZM8.76667 1.61485C8.78328 1.55483 8.81275 1.49914 8.85304 1.45165C8.89334 1.40416 8.94348 1.36601 9 1.33985L8.4575 0.214017C8.01417 0.427351 7.68083 0.822351 7.55667 1.30152L8.76667 1.61485ZM9 1.33985C9.11405 1.28538 9.24458 1.27644 9.365 1.31485L9.7475 0.124851C9.32193 -0.0115497 8.86026 0.0203614 8.4575 0.214017L9 1.33985ZM10.795 8.15318H15.1117V6.90318H10.795V8.15318ZM2.9325 16.8382L2.1225 7.47485L0.8775 7.58235L1.68583 16.9457L2.9325 16.8382ZM2.125 16.9273V7.52818H0.875V16.9273H2.125ZM1.68583 16.9457C1.68329 16.9154 1.68791 16.8849 1.69778 16.8562C1.70765 16.8274 1.72339 16.8011 1.744 16.7787C1.76461 16.7564 1.78964 16.7386 1.8175 16.7264C1.84536 16.7143 1.87544 16.7081 1.90583 16.7082V17.9582C2.51083 17.9582 2.98417 17.4398 2.9325 16.8382L1.68583 16.9457ZM11.2792 3.45235C11.3831 2.81879 11.3536 2.17051 11.1925 1.54902L9.9825 1.86318C10.0999 2.31595 10.1215 2.78826 10.0458 3.24985L11.2792 3.45235ZM6.16333 16.7082C5.97251 16.7079 5.78873 16.6361 5.64821 16.507C5.50769 16.3779 5.42062 16.2008 5.40417 16.0107L4.15917 16.1182C4.20253 16.62 4.4324 17.0873 4.80342 17.4279C5.17444 17.7686 5.65966 17.9578 6.16333 17.9582V16.7082ZM6.18917 6.50485C6.75583 6.01652 7.36583 5.43568 7.77 4.67985L6.66667 4.09152C6.37833 4.63235 5.91917 5.08818 5.3725 5.55818L6.18917 6.50485ZM17.095 9.26068C17.1452 8.97151 17.1315 8.67486 17.055 8.39151C16.9784 8.10817 16.8409 7.84499 16.6519 7.6204C16.463 7.39581 16.2272 7.21524 15.9612 7.09135C15.6951 6.96746 15.4052 6.90324 15.1117 6.90318V8.15318C15.5842 8.15318 15.945 8.57985 15.8633 9.04735L17.095 9.26068ZM1.90583 16.7082C2.0275 16.7082 2.125 16.8065 2.125 16.9273H0.875C0.875 17.4957 1.33583 17.9582 1.90583 17.9582V16.7082ZM9.49333 6.62068C9.46227 6.8095 9.47265 7.00281 9.52376 7.18722C9.57488 7.37162 9.6655 7.54269 9.78933 7.68857C9.91317 7.83445 10.0673 7.95164 10.2409 8.03201C10.4146 8.11239 10.6036 8.15318 10.795 8.15318V6.90318C10.7848 6.90323 10.7748 6.90187 10.7656 6.89758C10.7563 6.8933 10.7482 6.88704 10.7416 6.87924C10.7351 6.87144 10.7304 6.8623 10.7278 6.85247C10.7252 6.84263 10.7248 6.83235 10.7267 6.82235L9.49333 6.62068ZM4.7275 8.18318C4.7172 8.0625 4.73487 7.9411 4.78065 7.82897C4.82643 7.71683 4.89818 7.61717 4.99 7.53818L4.17333 6.59068C3.93168 6.79904 3.74296 7.06181 3.62271 7.35736C3.50247 7.65292 3.45412 7.9728 3.48167 8.29068L4.7275 8.18318Z"
										fill="#747678"
									/>
								</svg>
								<Typography
									mx={1}
									fontSize={12}>
									{"خرید این محصول را پیشنهاد می کنم."}
								</Typography>
							</ToggleButton>
							<ToggleButton
								color="error"
								value={-1}
								sx={{ display: "flex", justifyContent: "start" }}>
								<svg
									width="18"
									height="18"
									viewBox="0 0 18 18"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path
										d="M1.5 10.4718L2.1225 10.5251C2.10815 10.6852 2.0327 10.8336 1.9118 10.9395C1.79091 11.0454 1.63387 11.1007 1.4733 11.0938C1.31273 11.0869 1.16098 11.0185 1.04957 10.9026C0.938149 10.7868 0.875632 10.6325 0.875 10.4718H1.5ZM15.8633 8.95265L15.275 5.55265L16.5075 5.33932L17.095 8.73932L15.8633 8.95265ZM10.0375 1.29182H6.16333V0.0418167H10.0375V1.29182ZM5.40417 1.98932L4.7275 9.81682L3.48167 9.70932L4.15917 1.88182L5.40417 1.98932ZM15.275 5.55265C14.8525 3.11098 12.6508 1.29182 10.0375 1.29182V0.0418167C13.2258 0.0418167 15.9758 2.26598 16.5075 5.33932L15.275 5.55265ZM10.0458 14.7501L9.49333 11.3793L10.7267 11.1776L11.2792 14.5476L10.0458 14.7501ZM4.99 10.4618L6.18917 11.4952L5.3725 12.4418L4.175 11.4085L4.99 10.4618ZM8.37 14.8568L8.76667 16.3851L7.55667 16.6985L7.16 15.171L8.37 14.8568ZM9.365 16.6851L9.48583 16.646L9.86833 17.836L9.7475 17.8751L9.365 16.6851ZM7.76917 13.3201C8.02948 13.8068 8.23116 14.3226 8.37 14.8568L7.16 15.171C7.04607 14.7321 6.88047 14.3083 6.66667 13.9085L7.76917 13.3201ZM9.48583 16.646C9.60474 16.6099 9.71261 16.5445 9.79944 16.4556C9.88626 16.3667 9.94923 16.2574 9.9825 16.1376L11.1925 16.451C11.1064 16.7747 10.9398 17.0715 10.7083 17.3136C10.4768 17.5557 10.1879 17.7354 9.86833 17.836L9.48583 16.646ZM8.76667 16.3851C8.78328 16.4452 8.81275 16.5009 8.85304 16.5483C8.89334 16.5958 8.94348 16.634 9 16.6601L8.4575 17.786C8.01417 17.5726 7.68083 17.1776 7.55667 16.6985L8.76667 16.3851ZM9 16.6601C9.11405 16.7146 9.24458 16.7236 9.365 16.6851L9.7475 17.8751C9.32193 18.0115 8.86026 17.9796 8.4575 17.786L9 16.6601ZM10.795 9.84682H15.1117L15.1117 11.0968L10.795 11.0968L10.795 9.84682ZM2.9325 1.16182L2.1225 10.5251L0.8775 10.4176L1.68583 1.05432L2.9325 1.16182ZM2.125 1.07265L2.125 10.4718H0.875L0.875 1.07265H2.125ZM1.68583 1.05432C1.68329 1.0846 1.68791 1.11509 1.69778 1.14383C1.70765 1.17257 1.72339 1.19895 1.744 1.22128C1.76461 1.24362 1.78964 1.26142 1.8175 1.27357C1.84536 1.28571 1.87544 1.29192 1.90583 1.29182L1.90583 0.0418167C2.51083 0.0418167 2.98417 0.56015 2.9325 1.16182L1.68583 1.05432ZM11.2792 14.5476C11.3831 15.1812 11.3536 15.8295 11.1925 16.451L9.9825 16.1368C10.0999 15.684 10.1215 15.2117 10.0458 14.7501L11.2792 14.5476ZM6.16333 1.29182C5.97251 1.29215 5.78873 1.36394 5.64821 1.49304C5.50769 1.62215 5.42062 1.7992 5.40417 1.98932L4.15917 1.88182C4.20253 1.38002 4.4324 0.912693 4.80342 0.572063C5.17444 0.231434 5.65966 0.0422401 6.16333 0.0418167V1.29182ZM6.18917 11.4952C6.75583 11.9835 7.36583 12.5643 7.77 13.3201L6.66667 13.9085C6.37833 13.3676 5.91917 12.9118 5.3725 12.4418L6.18917 11.4952ZM17.095 8.73932C17.1452 9.02849 17.1315 9.32514 17.055 9.60849C16.9784 9.89183 16.8409 10.155 16.6519 10.3796C16.463 10.6042 16.2272 10.7848 15.9612 10.9087C15.6951 11.0325 15.4052 11.0968 15.1117 11.0968L15.1117 9.84682C15.5842 9.84682 15.945 9.42015 15.8633 8.95265L17.095 8.73932ZM1.90583 1.29182C2.0275 1.29182 2.125 1.19348 2.125 1.07265H0.875C0.875 0.504316 1.33583 0.0418167 1.90583 0.0418167L1.90583 1.29182ZM9.49333 11.3793C9.46227 11.1905 9.47265 10.9972 9.52376 10.8128C9.57488 10.6284 9.6655 10.4573 9.78933 10.3114C9.91317 10.1655 10.0673 10.0484 10.2409 9.96799C10.4146 9.88761 10.6036 9.84682 10.795 9.84682L10.795 11.0968C10.7848 11.0968 10.7748 11.0981 10.7656 11.1024C10.7563 11.1067 10.7482 11.113 10.7416 11.1208C10.7351 11.1286 10.7304 11.1377 10.7278 11.1475C10.7252 11.1574 10.7248 11.1676 10.7267 11.1776L9.49333 11.3793ZM4.7275 9.81682C4.7172 9.9375 4.73487 10.0589 4.78065 10.171C4.82643 10.2832 4.89818 10.3828 4.99 10.4618L4.17333 11.4093C3.93168 11.201 3.74296 10.9382 3.62271 10.6426C3.50247 10.3471 3.45412 10.0272 3.48167 9.70932L4.7275 9.81682Z"
										fill="#747678"
									/>
								</svg>

								<Typography
									mx={1}
									fontSize={12}>
									{"خرید این محصول را پیشنهاد نمی کنم."}
								</Typography>
							</ToggleButton>
							<ToggleButton
								color="warning"
								value={0}
								sx={{ display: "flex", justifyContent: "start" }}>
								<svg
									width="12"
									height="12"
									viewBox="0 0 12 12"
									fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M11.7094 1.37603C11.7806 1.30485 11.8372 1.22034 11.8758 1.12731C11.9144 1.03428 11.9343 0.934557 11.9343 0.833836C11.9344 0.733115 11.9146 0.633369 11.8761 0.540291C11.8377 0.447214 11.7812 0.362628 11.71 0.291364C11.6389 0.2201 11.5543 0.163554 11.4613 0.124952C11.3683 0.086351 11.2686 0.0664513 11.1678 0.0663894C11.0671 0.0663275 10.9674 0.0861046 10.8743 0.124592C10.7812 0.163078 10.6966 0.219521 10.6254 0.290698L6.00003 4.91603L1.37603 0.290698C1.23211 0.146774 1.0369 0.065918 0.833364 0.065918C0.629825 0.065918 0.434622 0.146774 0.290698 0.290698C0.146774 0.434622 0.065918 0.629825 0.065918 0.833364C0.065918 1.0369 0.146774 1.23211 0.290698 1.37603L4.91603 6.00003L0.290698 10.624C0.219434 10.6953 0.162904 10.7799 0.124336 10.873C0.0857684 10.9661 0.065918 11.0659 0.065918 11.1667C0.065918 11.2675 0.0857684 11.3673 0.124336 11.4604C0.162904 11.5535 0.219434 11.6381 0.290698 11.7094C0.434622 11.8533 0.629825 11.9341 0.833364 11.9341C0.934147 11.9341 1.03394 11.9143 1.12705 11.8757C1.22016 11.8372 1.30477 11.7806 1.37603 11.7094L6.00003 7.08403L10.6254 11.7094C10.7693 11.8531 10.9644 11.9338 11.1678 11.9337C11.3713 11.9335 11.5663 11.8526 11.71 11.7087C11.8538 11.5648 11.9345 11.3696 11.9343 11.1662C11.9342 10.9628 11.8533 10.7678 11.7094 10.624L7.08403 6.00003L11.7094 1.37603Z"
										fill="#747678"
									/>
								</svg>
								<Typography
									mx={1}
									fontSize="small">
									{"نظری ندارم."}
								</Typography>
							</ToggleButton>
						</ToggleButtonGroup>
					</Box>
					<Button
						variant="contained"
						onClick={formik.handleSubmit}
						fullWidth
						sx={{
							mt: 8,
							bgcolor: Colors.orange,
							color: "#000",
							width: 240,
							height: 43,
							borderRadius: 18,
							opacity: "70%",
							"&:hover": {
								bgcolor: Colors.orange,
								opacity: "100%",
							},
						}}>
						<Typography fontWeight={400}>{"ثبت نظر"}</Typography>
					</Button>
				</Box>
			</Grid>
		</Grid>
	);
};

export default BlogSendComment;