import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import "./upload.css";
const Upload = () => {
	const [photo, setphoto] = useState("");
	const [mapData, setMapData] = useState([]);
	const storedData = JSON.parse(localStorage.getItem('myArray')) || [];
	useEffect(() => {
		setMapData(storedData)
	}, []);
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {

			const d = new FormData();
			d.append("file", photo);
			d.append("upload_preset", "upload")
			d.append("cloud_name", "dwc7aty0x")
			const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dwc7aty0x/image/upload", d)
			console.log(uploadRes.data);
			const { url } = uploadRes.data;
			const x = localStorage.getItem("token")
			let dat = {
				photo: url,
				email: x
			}
			// storedData = JSON.parse(localStorage.getItem('myArray')) || [];


			const newElement = url;
			storedData.push(newElement);
			setMapData(storedData)
			localStorage.setItem('myArray', JSON.stringify(storedData));




			const res = await axios.post("http://localhost:8080/api/users/photos", dat);




		}
		catch (err) {

		}
	}


	return (
		<div>

			<input type="file" id="img" name="img" onChange={(e) => setphoto(e.target.files[0])} accept="image/*" />
			<button type="submit" className="blue_btn" onClick={handleSubmit}>
				Submit
			</button>
			{mapData && mapData.map((fruit, index) => (
				<div style={{ justifyContent: "center", textAlign: "center" }}>
					<img src={fruit} alt="" />
				</div>
			))
			}



		</div>
	);
};

export default Upload;
