import { useParams } from "react-router-dom";
import Layout from "../../../ui/layout/Layout";
import axios from "axios";
import { apiUrl } from "../../../api";
import { useEffect, useState } from "react";


export const UserPage = () => {
  const { id } = useParams();
	const [user, setUser] = useState({});

	const getUser = async () => {
		try {
			const {data} = await axios.get(`${apiUrl}/users/${id}`);
			console.log(data);
			setUser(data);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getUser();
	}, [])
	
  return (
    <Layout>
      <div>
				<p className="mt">Nombre: </p>
				<p>{user.nickname}</p>
			</div>
    </Layout>
  )
}
