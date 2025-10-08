import axios from 'axios';
import React, { useEffect } from 'react'
const [loading ,setLoading] = useState(false);
export default function apiStore() {

    fetchApi: async () => {
        set({ loading: true });
        try {
         // inside fetchCart
    const res = await axios.get(
    `${API_URL}/${apiEndPoint}`
    );
    set({ loading: false });
    console.log("Fetched products:", res.data
    );
        } catch (err) {
            console.error("❌ Error fetching cart:", err.response?.data || err.message);
            set({ loading: false });
            }
        set({ loading: false })

}
  return (
    <div>
      
    </div>
  )
}
