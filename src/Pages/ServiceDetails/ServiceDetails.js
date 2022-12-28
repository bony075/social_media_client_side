import React, { useContext } from "react";
import { NavLink, useLoaderData } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";

import Review from "../Review/Review";

const ServiceDetails = () => {
  const { _id, title, price, img, description } = useLoaderData();
  const { user } = useContext(AuthContext);


  const handleSetReview = (event) => {
    event.preventDefault();
    const form = event.target;
    // const name = `${form.firstName.value} ${form.lastName.value}`;
    const name = user?.name || "No name";
    const email = user?.email || "unregistered";
    // const phone = form.phone.value;
    const message = form.message.value;

    const review = {
      service: _id,
      serviceName: title,
      price,
      customer: name,
      email,
      // phone,
      message,
    };

    fetch("http://localhost:5000/review", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(review),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          alert("review placed successfully");
          form.reset();
        }
      })
      .catch((er) => console.error(er));
  };

  return (
    <div>
      <div>
        <div className="card w-full bg-base-100 shadow-xl">
          <figure>
            <img src={img} alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{title}</h2>
            <p>{description}</p>
            <div className="card-actions justify-end"></div>
          </div>
        </div>
      </div>
      { }
      <div className="my-8">
        {user?.uid ? (
          <>
            <div>
              <Review></Review>
            </div>
            <form onSubmit={handleSetReview}>
              {/* <h2 className="text-4xl">You are about to order: {title}</h2>
          <h4 className="text-3xl">Price: {price}</h4> */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                <input
                  name="name"
                  type="text"
                  placeholder="First Name"
                  defaultValue={user?.displayName}
                  className="input input-ghost w-full  input-bordered"
                  readOnly
                />
                {/* <input
              name="lastName"
              type="text"
              placeholder="Last Name"
              className="input input-ghost w-full  input-bordered"
            /> */}
                {/* <input
              name="phone"
              type="text"
              placeholder="Your Phone"
              className="input input-ghost w-full  input-bordered"
              required
            /> */}
                <input
                  name="email"
                  type="text"
                  placeholder="Your email"
                  defaultValue={user?.email}
                  className="input input-ghost w-full  input-bordered"
                  readOnly
                />
              </div>
              <textarea
                name="message"
                className="textarea textarea-bordered h-24 w-full"
                placeholder="Your Message"
                required
              ></textarea>

              {user?.email ? (
                <input className="btn" type="submit" value="Review" />
              ) : (
                <NavLink className="btn btn-primary" to="/login">
                  Login
                </NavLink>
              )}
            </form>
          </>
        ) : (
          <>
            <p>Please Login to Submit review... </p>
            <NavLink className="btn btn-primary" to="/login">
              Login
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default ServiceDetails;
