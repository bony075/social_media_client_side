import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";

const ReviewRow = ({ review, handleDelete, handleEdit }) => {
  const { user } = useContext(AuthContext);
  const { _id, serviceName, price, email, customer, phone, service, message,status } =
    review;
  const [reviewService, setReviewService] = useState({});

  useEffect(() => {
    fetch(
      `http://localhost:5000/services/${service}`
    )
      .then((res) => res.json())
      .then((data) => setReviewService(data));
  }, [service]);

  return (
    <div>
      <tr>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="rounded w-24 h-24">
                {user?.photoURL && (
                  <img
                    src={user.photoURL}
                    alt="Avatar Tailwind CSS Component"
                  />
                )}
              </div>
            </div>
            <div>
              <div className="font-bold">{customer}</div>
              <div className="text-sm opacity-50">{phone}</div>
            </div>
          </div>
        </td>
        <td>
          {serviceName}
          <br />
          {/* <span className="badge badge-ghost badge-sm">${price}</span> */}
        </td>
        <td> {message}</td>
        <th>
          <button
              onClick={() => handleEdit(_id)}
              className="btn btn-ghost btn-xs"
            >
              {status ? status : "pending"}
            </button>
          <th>
            <label>
              <button
                onClick={() => handleDelete(_id)}
                className="btn btn-ghost"
              >
                DELETE
              </button>
            </label>
          </th>
          <th>
            <label>
              <button
                onClick={() => handleEdit(_id)}
                className="btn btn-ghost"
              >
                EDIT
              </button>
            </label>
          </th>
        </th>
      </tr>
    </div>
  );
};

export default ReviewRow;
