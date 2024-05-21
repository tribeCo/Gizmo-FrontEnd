"use client";

import { baseUrl } from "@/services";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const { tokens } = useAuth();
	const [cartList, setCartList] = useState([]);

	//? Use Effect for get cart items from local storage
	useEffect(() => {
		const storedItems = JSON.parse(localStorage.getItem("cartList") || "[]");
		setCartList(storedItems);
	}, [tokens]);

	//? use this function to add item to cart list (user or unknown)
	const addToCart = async ({ color, product, quantity }) => {
		let id;
		if (tokens.access) {
			try {
				const response = await fetch(`${baseUrl}/api/cart/item/add/`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${tokens.access}`,
					},
					next: {
						revalidate: 0,
					},
					body: JSON.stringify({
						color,
						product,
						quantity,
						//TODO check is_sync
					}),
				});
				const { data } = await response.json();
				if (response.ok) id = data.id;
			} catch (error) {
				throw new Error("خطایی رخ داد.");
			}
		}
		const newCartList = cartList.map((a) => {
			return { ...a };
		});
		if (!id) {
			id = cartList.length > 0 ? cartList[cartList.length - 1].cid + 1 : 1;
		}
		newCartList.push({ cid: id, color, product, quantity, is_sync: false });
		setCartList(newCartList);
		if (typeof window !== "undefined") {
			localStorage.setItem("cartList", JSON.stringify(newCartList));
		}
	};

	//?
	const updateCartList = async ({ tokens }) => {
		try {
			const response = await fetch(`${baseUrl}/api/cart/item/add/list/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${tokens.access}`,
				},
				next: {
					revalidate: 1,
				},
				body: JSON.stringify(cartList),
			});
			const res = await response.json();
			console.log(res);
			if (typeof window !== "undefined") {
				localStorage.setItem("cartList", JSON.stringify(res.data.items));
			}
		} catch (error) {
			console.log(error);
		}
	};

	//?
	const removeFromCart = async (id) => {
		if (tokens.access) {
			try {
				await fetch(`${baseUrl}/api/cart/item/delete/${id}/`, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${tokens.access}`,
					},
					next: {
						revalidate: 0,
					},
				});
			} catch (error) {
				console.log(error);
				return 0;
			}
		}

		const cartStorageFilter = cartList.filter((ci) => {
			return ci.cid !== id;
		});
		setCartList(cartStorageFilter);

		if (typeof window !== "undefined") {
			localStorage.setItem("cartList", JSON.stringify(cartStorageFilter));
		}
	};

	const getCart = async () => {
		console.log(cartList);
		try {
			const response = await fetch(`${baseUrl}/api/cart/unknown/`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				next: {
					revalidate: 1,
				},
				body: JSON.stringify(cartList),
			});
			return response.json();
		} catch (error) {
			console.log(error);
		}
	};

	const readCart = async () => {
		console.log(cartList);
		if (tokens.access) {
			try {
				const response = await fetch(`${baseUrl}/api/cart/local/`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${tokens.access}`,
					},
					next: {
						revalidate: 1,
					},
				});
				return response.json();
			} catch (error) {
				console.log(error);
			}
		}
	};

	const deleteList = async () => {
		setCartList([]);
		if (typeof window !== "undefined") {
			localStorage.setItem("cartList", JSON.stringify([]));
		}
	};

	const contextData = {
		cartList,
		readCart,
		addToCart,
		removeFromCart,
		deleteList,
		updateCartList,
		getCart,
		length: cartList.length,
	};

	return (
		<CartContext.Provider value={contextData}>{children}</CartContext.Provider>
	);
};

export const useCart = () => {
	return useContext(CartContext);
};
