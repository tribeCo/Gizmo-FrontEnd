import React, { useState, useEffect } from "react";
import { Colors } from "@/utils";
import eye from "@/components/siteIcons/eye-slash.svg";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { Button, Typography, Stack, Paper } from "@mui/material";
import { EditPassword, EditProfile, fetchInformation } from "@/services/DashBoard";
import { enqueueSnackbar } from "notistack";

export default function DashBoardEditProfile({ information }) {
	const [secondField, setSecondField] = React.useState("password");
	const [thirdField, setThirdField] = React.useState("password");
	const [forthField, setForthField] = React.useState("password");
	const { tokens } = useAuth();
	const [newProfileData, setNewProfileData] = useState({
		first_name: "",
		last_name: "",
		phoneNumber: "",
		gender: "",
		email: "",
	});

	const GetInformation = async () => {
		try {
			const data = await fetchInformation(tokens);
			if (!data) {
				router.replace("/login");
			}
			setNewProfileData(data);
		} catch (error) {
			console.error('Error fetching information:', error);
			enqueueSnackbar({ message: error.message || "خطا در دریافت اطلاعات.", variant: "error" });
		}
	};

	useEffect(() => {
		async function GetInfo() {
			await GetInformation();
		}
		GetInfo();

		return () => {
		};
	}, []);

	const handleUpdateProfileFields = ({ data }) => {
		const new_data = {
			first_name: data.first_name,
			last_name: data.last_name,
			phoneNumber: data.phoneNumber,
			gender: data.gender,
			email: data.email,
		};

		setNewProfileData(new_data);
	}

	const [newProfilePassword, setNewProfilePassword] = useState({
		new_password_confirm: "",
		password: "",
		new_password: "",
	});

	const handleInputChange = (event) => {
		event.target.value = event.target.value.replace(/[^0-9]/g);
		if (event.target.value == "undefined") {
			event.target.value = "";
		}
	};

	const editNewProfile = async () => {
		try {
			const response = await EditProfile(newProfileData, tokens);
			if (response) {
				enqueueSnackbar({ message: response.messages || "پروفایل با موفقیت به‌روزرسانی شد.", variant: "success" });
			}
		} catch (error) {
			console.error('خطا در ارسال داده به API:', error);
			enqueueSnackbar({ message: error.message || "به‌روزرسانی پروفایل ناموفق بود.", variant: "error" });
		} finally {
			await GetInformation();
		}
	};
	
	const handleClearResetPasswordInputs = () => {
		setNewProfilePassword((obj) => {
			obj.password = "",
			obj.new_password = "",
			obj.new_password_confirm = ""
		});
	}

	const editNewProfilePassword = async () => {
		if (newProfilePassword.new_password !== newProfilePassword.new_password_confirm) {
			enqueueSnackbar({ message: "رمزهای عبور مطابقت ندارند. لطفاً مطمئن شوید که رمز عبور جدید و تأیید رمز عبور شما مطابقت دارند.", variant: "error" });
			return;
		}
		try {
			const response = await EditPassword(newProfilePassword, tokens);
			console.log("response: " + response);
			if (response) {
				enqueueSnackbar({ message: response.messages || "رمز عبور با موفقیت به‌روزرسانی شد.", variant: "success" });
				setNewProfilePassword({
					new_password_confirm: "",
					password: "",
					new_password: "",
				});

				handleClearResetPasswordInputs();
			}
		} catch (error) {
			console.error('خطا در ارسال داده به API:', error);
			enqueueSnackbar({ message: error.message || "به‌روزرسانی رمز عبور ناموفق بود.", variant: "error" });
		}
	};

	return (
		<Paper
			variant="outlined"
			sx={{
				height: "fit-content",
				borderRadius: "15px",
				boxShadow: "0px 4px 5px rgba(0, 0, 0, 0.1)",
			}}>
			<section className="editProfile py-8 w-[60rem] px-[4%] max-h-full flex flex-col lg:w-[21rem]">
				<div className="editProfile-info flex border-b border-[#EDEDED] justify-between py-2 mb-4">
					<Typography
						variant="h6"
						fontSize={18}
						fontWeight={700}>
						ویرایش اطلاعات کاربری
					</Typography>
				</div>

				<Stack className="px-[3%]">
					<div className="editProfile-info-fields flex w-full justify-between gap-8 lg:gap-0 lg:flex-col">
						<div className="info-fields-one max-sm:text-sm flex gap-8 md:gap-4 flex-col w-full">
							<div className="flex items-center">
								<label
									htmlFor="name"
									className="w-full block text-sm mr-2 text-[#99999A] sm:gap-2 whitespace-nowrap sm:text-xs">
									نام
								</label>
								<input
									type="text"
									value={newProfileData.first_name}
									onChange={(e) => {
										setNewProfileData({
											...newProfileData,
											first_name: e.target.value,
										})}
									}
									id="name"
									className="rounded-full border-[#747678] border-2 border-opacity-70 h-8 outline-none px-2"
								/>
							</div>

							<div className="flex items-center">
								<label
									htmlFor="familyName"
									className="w-full block text-sm mr-2 text-[#99999A] sm:gap-5 text-nowrap  whitespace-nowrap sm:text-xs">
									نام خانوادگی
								</label>
								<input
									type="text"
									value={newProfileData.last_name}
									onChange={(e) =>
										setNewProfileData({
											...newProfileData,
											last_name: e.target.value,
										})
									}
									id="familyName"
									className="rounded-full border-[#747678] border-2 border-opacity-70 h-8 outline-none px-2"
								/>
							</div>

							<div className="flex justify-between items-center">
								<label
									htmlFor="phoneNumber"
									className="w-full block text-sm mr-2 text-[#99999A] sm:gap-5  whitespace-nowrap sm:text-xs">
									شماره تلفن
								</label>
								<input
									disabled
									type="tel"
									value={newProfileData.phoneNumber}
									onInput={handleInputChange}
									onChange={(e) =>
										setNewProfileData({
											...newProfileData,
											phoneNumber: e.target.value,
										})
									}
									id="phoneNumber"
									className="rounded-full border-[#747678] border-2 border-opacity-70 h-8 outline-none px-2"
								/>
							</div>
						</div>

						<div
							spacing={2}
							className="info-fields-two max-sm:text-sm gap-8 md:gap-4 lg:mt-4 flex flex-col w-full">
							<div className="flex justify-between items-center">
								<label
									htmlFor="gender"
									className="w-fit block text-sm mr-2 text-[#99999A]  whitespace-nowrap sm:text-xs">
									جنسیت
								</label>
								<select
									type="select"
									value={newProfileData.gender}
									onChange={(e) =>
										setNewProfileData({
											...newProfileData,
											gender: e.target.value,
										})
									}
									id="gender"
									className="rounded-full border-[#747678] bg-white border-2 border-opacity-70 w-full h-8 outline-none px-2 max-w-[13.5rem]">
									<option value="u">یک مورد را انتخاب کنید</option>
									<option value="m">مرد</option>
									<option value="f">زن</option>
									<option value="u">مایل به گفتن ندارم</option>
								</select>
							</div>

							<div className="flex justify-between items-center">
								<label
									htmlFor="email"
									className="w-full block text-sm mr-2 text-[#99999A]  whitespace-nowrap sm:text-xs">
									آدرس ایمیل
								</label>
								<input
									type="email"
									disabled
									value={newProfileData.email}
									id="email"
									className="rounded-full border-[#747678] border-2 border-opacity-70 h-8 outline-none px-2"
								/>
							</div>

							{/* <div className="flex justify-between items-center">
								<label
									htmlFor="password"
									className="w-full block text-sm mr-2 text-[#99999A]  whitespace-nowrap sm:text-xs">
									رمز عبور
								</label>
								<div className="relative">
									<input
										id="hs-toggle-password"
										onChange={(e) =>
											setNewProfileData({
												...newProfileData,
												password: e.target.value,
											})
										}
										type={firstField}
										class="rounded-full border-[#747678] border-2 border-opacity-70 h-8 outline-none px-2"
									/>
									<button
										className="absolute w-4 bottom-2 left-3"
										onClick={() => {
											firstField === "password"
												? setFirstField("text")
												: setFirstField("password");
										}}>
										<Image src={eye}></Image>
									</button>
								</div>
							</div> */}

							<div className="justify-self-start flex justify-between flex-row-reverse lg:mx-12 md:mt-6 pr-20 lg:pr-0">
								<Button
									variant="contained"
									onClick={editNewProfile}
									sx={{
										width: 215,
										bgcolor: Colors.orange,
										color: "black",
										borderRadius: "50px",
										boxShadow: "none",
										height: 34,
										"&:hover": {
											bgcolor: Colors.orange,
										},
									}}>
									<Typography variant="div  whitespace-nowrap lg:text-xs">
										ذخیره تغییرات
									</Typography>
								</Button>

								{/* <Button className='w-[49%]'
                                    variant="contained"
                                    // onClick={editNewProfile}
                                    sx={{
                                        bgcolor: 'white',
                                        border: '2px solid',
                                        borderColor: Colors.orange,
                                        color: "black",
                                        borderRadius: "50px",
                                        boxShadow: "none",
                                        height: 34,
                                        "&:hover": {
                                            bgcolor: Colors.orange,
                                        },
                                    }}>
                                    <Typography variant='div  whitespace-nowrap lg:text-xs'>انصراف</Typography>
                                </Button> */}
							</div>
						</div>
					</div>
				</Stack>

				<Stack className="md:mt-8 sm:mt-3">
					<div className="mt-8 mb-8 md:mt-2 changePassword-info flex border-b border-[#EDEDED] justify-between py-2">
						<Typography
							variant="h6"
							fontSize={18}
							fontWeight={700}>
							تغییر رمز عبور
						</Typography>
					</div>

					<div className="changePassword-info-fields flex gap-8 w-full justify-between lg:flex-col lg:gap-2 px-[3%]">
						<div className="info-fields-one flex flex-col gap-8 md:gap-2 w-full">
							<div className="flex justify-between items-center">
								<label
									htmlFor="password"
									className="w-full block text-sm mr-1 text-[#99999A]  whitespace-nowrap md:text-xs">
									رمز عبور جدید
								</label>
								<div className="relative">
									<input
										style={{paddingRight: 6}}
										id="hs-toggle-password"
										type={secondField}
										onChange={(e) =>
											setNewProfilePassword({
												...newProfilePassword,
												new_password: e.target.value,
											})
										}
										class="rounded-full border-[#747678] border-2 border-opacity-70 h-8 lg:mt-2 outline-none"
									/>
									<button
										className="absolute w-4 bottom-2 left-3"
										onClick={() => {
											secondField === "password"
												? setSecondField("text")
												: setSecondField("password");
										}}>
										<Image src={eye}></Image>
									</button>
								</div>
							</div>

							<div className="flex justify-between items-center">
								<label
									htmlFor="password"
									className="w-full block text-sm mr-1 text-[#99999A]  whitespace-nowrap md:text-xs">
									رمز عبور قدیمی
								</label>
								<div className="relative">
									<input
										style={{paddingRight: 6}}
										id="hs-toggle-password"
										type={thirdField}
										onChange={(e) =>
											setNewProfilePassword({
												...newProfilePassword,
												password: e.target.value,
											})
										}
										class="rounded-full border-[#747678] border-2 border-opacity-70 h-8 lg:mt-2 outline-none"
									/>
									<button
										className="absolute w-4 bottom-2 left-3"
										onClick={() => {
											thirdField === "password"
												? setThirdField("text")
												: setThirdField("password");
										}}>
										<Image src={eye}></Image>
									</button>
								</div>
							</div>
						</div>

						<div className="info-fields-two flex flex-col w-full gap-8 md:gap-0">
							<div className="flex justify-between items-center">
								<label
									htmlFor="password"
									className="w-full block text-sm mr-1 text-[#99999A]  whitespace-nowrap md:text-xs">
									تکرار رمز عبور
								</label>
								<div className="relative">
									<input
										style={{paddingRight: 6}}
										id="hs-toggle-password"
										type={forthField}
										onChange={(e) =>
											setNewProfilePassword({
												...newProfilePassword,
												new_password_confirm: e.target.value,
											})
										}
										class="rounded-full border-[#747678] border-2 border-opacity-70 h-8 lg:mt-2 outline-none"
									/>
									<button
										className="absolute w-4 bottom-2 left-3"
										onClick={() => {
											forthField === "password"
												? setForthField("text")
												: setForthField("password");
										}}>
										<Image src={eye}></Image>
									</button>
								</div>
							</div>

							<div className="flex flex-row-reverse justify-between lg:mx-12 md:mt-6  pr-20 lg:pr-0">
								<Button
									variant="contained"
									onClick={editNewProfilePassword}
									sx={{
										width: 200,
										bgcolor: Colors.orange,
										color: "black",
										borderRadius: "50px",
										boxShadow: "none",
										height: 34,
										"&:hover": {
											bgcolor: Colors.orange,
										},
									}}>
									<Typography variant="div  whitespace-nowrap lg:text-xs">
										ذخیره تغییرات
									</Typography>
								</Button>

								{/* <Button className='w-[49%]'
                                    variant="contained"
                                    // onClick={addNewAddress}
                                    sx={{
                                        bgcolor: 'white',
                                        border: '2px solid',
                                        borderColor: Colors.orange,
                                        color: "black",
                                        borderRadius: "50px",
                                        boxShadow: "none",
                                        height: 34,
                                        "&:hover": {
                                            bgcolor: Colors.orange,
                                        },
                                    }}>
                                    <Typography variant='div  whitespace-nowrap lg:text-xs'>انصراف</Typography>
                                </Button> */}
							</div>
						</div>
					</div>
				</Stack>
			</section>
		</Paper>
	);
}
