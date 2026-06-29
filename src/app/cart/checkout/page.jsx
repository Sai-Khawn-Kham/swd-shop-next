"use client";

import Breadcrumb from "@/components/Breadcrumb";
import Container from "@/components/Container";
import useAccountsStore from "@/store/useAccountsStore";
import useCartsStore from "@/store/useCartsStore";
import useOrdersStore from "@/store/useOrdersStore";
import usePaymentsStore from "@/store/usePaymentsStore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CheckoutPage = () => {
   const router = useRouter();
   const { users } = useAccountsStore();
   const user = users[0]
   const { carts, subTotal, shipping, tax, netTotal, calSubTotal, calShipping, calTax, calNetTotal, emptyCarts } = useCartsStore();
   const { orders, addOrder } = useOrdersStore();
   const { payments } = usePaymentsStore();
   const [ address, setAddress ] = useState(user&&user.address?user.address:"")
   const [ name, setName ] = useState(user?user.name:"")
   const [ email, setEmail ] = useState(user?user.email:"")
   const [ phone, setPhone ] = useState(user&&user.phone?user.phone:"")
   const [ paymentSelect, setPaymentSelect ] = useState("");
   const [ additional, setAdditional ] = useState("")

   useEffect(() => {
      if(users.length==0 || carts.length==0) {
         router.push("/")
      }
      calSubTotal();
      calShipping();
      calTax();
      calNetTotal();
   }, [])
   
   const handleAddress = (e) => {
      setAddress(e.target.value)
   }
   const handleName = (e) => {
      setName(e.target.value)
   }
   const handleEmail = (e) => {
      setEmail(e.target.value)
   }
   const handlePhone = (e) => {
      setPhone(e.target.value)
   }
   const handleAdditional = (e) => {
      setAdditional(e.target.value)
   }

   const handlePlaceOrder = () => {
      const addressCon = address.replaceAll(" ","")==""; // false for right input
      const nameCon = name.replaceAll(" ","")==""; // false for right input
      const emailCon = email.split("@")[1]=="gmail.com";   // true for right input
      const phoneCon = phone.replace(/[^0-9]/g,'').length==phone.length && phone.replace(/[^0-9]/g,'').length==11 && phone.replace(/[^0-9]/g,'');  // true
      const paymentCon = paymentSelect=="";  // false for right input
      const cartsCon = carts.length==0;  // false for right input
      const date = new Date();
      
      if(!addressCon) {
         if(!nameCon) {
            if(emailCon) {
               if(phoneCon) {
                  if(!paymentCon) {
                     if(!cartsCon) {
                        addOrder({
                           id: orders.length+1,
                           orderId: (orders.length+1).toString().padStart(5,"0"),
                           carts: carts,
                           subTotal: subTotal,
                           shipping: shipping,
                           tax: tax,
                           netTotal: netTotal,
                           customer: {
                              name,
                              email,
                              phone,
                              address,
                              payment: paymentSelect,
                              additional,
                           },
                           date,
                        })
                        emptyCarts();
                        calSubTotal();
                        calShipping();
                        calTax();
                        calNetTotal();
                        router.push(`/cart/checkout/confirm-order-${orders.length+1}`)
                     } else {
                        toast.error("Add product to cart first")
                     }
                  } else {
                     toast.error("Choose payment method")
                  }
               } else {
                  toast.error("Wrong phone number")
               }
            } else {
               toast.error("Wrong email")
            }
         } else {
            toast.error("Fill your name")
         }
      } else {
         toast.error("Fill your address")
      }
   }
   return (
      <Container>
         <Breadcrumb links={[{ name: "Cart", path: "/cart" }]} current={"Checkout"} />
         <div className="my-10">
            <h2 className="text-2xl font-bold uppercase">checkout</h2>
            <p className="text-gray-500 mb-5">
               Almost there! complete your order.
            </p>
            <div className="grid md:grid-cols-12 gap-5">
               <div className="md:col-span-8 border border-gray-300 rounded px-1 md:px-5">
                  <div className="border-b border-gray-300 py-3 md:py-5 px-2 flex flex-col gap-2">
                     <label htmlFor="address" className="font-bold text-lg">
                        Shipping address
                     </label>
                     <input type="text" value={address} onChange={handleAddress} name="address" id="address" className="border border-gray-300 rounded py-1 px-2 focus:outline-none" placeholder="123 Main St, Apt 4B, San Francisco, CA 94107, USA" required />
                  </div>
                  <div className="border-b border-gray-300 py-3 md:py-5 px-2">
                     <h3 className="font-bold text-lg mb-1 md:mb-3">
                        Personal information
                     </h3>
                     <div className="grid md:grid-cols-2 gap-x-5 gap-y-2">
                        <div className="flex flex-col gap-1">
                           <label htmlFor="name">Name</label>
                           <input type="text" value={name} onChange={handleName} name="name" id="name" className="border border-gray-300 rounded py-1 px-2 focus:outline-none" placeholder="Kyaw Kyaw" required />
                        </div>
                        <div className="flex flex-col gap-1">
                           <label htmlFor="email">Email</label>
                           <input type="email" value={email} onChange={handleEmail} name="email" id="email" className="border border-gray-300 rounded py-1 px-2 focus:outline-none" placeholder="example@gmail.com" required />
                        </div>
                        <div className="md:col-span-2 flex flex-col gap-1">
                           <label htmlFor="phone">Phone Number</label>
                           <input type="text" value={phone} onChange={handlePhone} name="phone" id="phone" className="border border-gray-300 rounded py-1 px-2 focus:outline-none" placeholder="+95 9 678 123456" required />
                        </div>
                     </div>
                  </div>
                  <div className="border-b border-gray-300 py-3 md:py-5 px-2">
                     <h3 className="font-bold text-lg mb-1 md:mb-3">
                        Payment Method
                     </h3>
                     <div className="flex flex-wrap gap-y-2 gap-x-3">
                        {payments.map((payment) => (
                           <label key={payment.id} htmlFor={payment.name} className="border border-gray-300 flex items-center gap-1 py-1 px-2 rounded-md">
                              <input type="radio" id={payment.name} name="payment" value={payment.name} onChange={() => setPaymentSelect(payment.name)} required />
                              {payment.label}
                           </label>
                        ))}
                     </div>
                  </div>
                  <div className="py-3 md:py-5 px-2">
                     <h3 className="font-bold text-lg mb-1 md:mb-3">
                        Additional Details
                     </h3>
                     <textarea value={additional} onChange={handleAdditional} name="additional" id="additional" className="w-full h-30 resize-none border border-gray-300 rounded p-3 focus:outline-none" required></textarea>
                  </div>
               </div>
               <div className="md:col-span-4">
                  <div className="border border-gray-300 rounded p-3 flex flex-col">
                     <div className="flex flex-col gap-3 h-52 overflow-auto hsb">
                        <h2 className="font-bold">Order Summary</h2>
                        <div className="flex justify-between items-center">
                           <p>Subtotal</p>
                           <p>{subTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                        </div>
                        <div className="flex justify-between items-center">
                           <p>Shipping</p>
                           <p>{shipping.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                        </div>
                        <div className="flex justify-between items-center">
                           <p>Tax</p>
                           <p>{tax.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                        </div>
                     </div>
                     <div className="flex flex-col border-t border-t-gray-300">
                        <div className="flex justify-between my-2">
                           <p>Total</p>
                           <p>{netTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                        </div>
                        <button onClick={handlePlaceOrder} className="bg-gray-950 text-gray-50 py-1 rounded cursor-pointer">
                           Place Order
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </Container>
   );
};

export default CheckoutPage;
