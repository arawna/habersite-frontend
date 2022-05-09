import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function AdminCategories() {

    const { authItem } = useSelector(({ auth }) => auth);
    const navigate = useNavigate();

    useEffect(() => {
        if(authItem[0].user.userType.type !== "admin"){
            navigate("/");
        }
    },[authItem,navigate])

  return (
    <div>Kategori ekleme silme sayfası</div>
  )
}
