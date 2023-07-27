import React ,{useState,useEffect} from 'react'

export default function DisplayComponent() {
    const [displayData, setDisplayData] = useState([])
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
        const fetchAllUser = async () => {
          try {
            const response = await fetch('http://localhost:8080/getAllUsers');
            const data = await response.json();
            setDisplayData(data.data);
          } catch (error) {
            window.alert('Error fetching countries:', error);
          }
        };
    
        fetchAllUser();
      }, []);
      const handleViewDetails =async function(userId){
        try{
      const response = await fetch(`http://localhost:8080/getAllUsers?userId=${userId}`);
      const data = await response.json();
      setUserDetails(data.data)
    } catch (error) {
      window.alert('Error fetching user details:', error);
    }

      }

  return (
    <div>
      {userDetails && (
        <div>
          <h2>User Details</h2>
          <p>First Name: {userDetails.firstName}</p>
          <p>Last Name: {userDetails.lastName}</p>
          <p>Email: {userDetails.email}</p>
          <p>Country: {userDetails.country}</p>
          <p>State: {userDetails.state}</p>
          <p>City: {userDetails.city}</p>
          <p>Gender: {userDetails.gender}</p>
          <p>DOB: {userDetails.dateOfBirth}</p>
        </div>
      )}
        {displayData.map((post)=>(
            <div key={post._id}>
                <li>
                  <p> FirstName: {post.firstName}</p>
                  <p>Email : {post.email}</p>
                </li>
                <button onClick={() => handleViewDetails(post._id)}>View Details</button>
            </div>
        ))}

    </div>
  )
}
