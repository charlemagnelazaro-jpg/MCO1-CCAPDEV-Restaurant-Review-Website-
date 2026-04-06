import React from 'react'
import Resto from './assets/resto.jpg'
import Pin from './assets/pin.png'
import { Rating } from './components/rating'
import { useState } from 'react';

const [editing, setEditing] = useState(false);
const [newUrl, setNewUrl] = useState(restaurant.googleMapsUrl || "");
const isOwner = restaurant.currentUserRole === 'owner';

const handleUpdateGoogleMapsUrl = async (newUrl) => {
  await fetch(`/api/restaurant/${restaurant._id}/google-maps-url`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ googleMapsUrl: newUrl }),
  });
};

const RestaurantCard = ({ restaurant }) => {
  if (!restaurant) return null;

    
  return (
    <div className="bg-card border rounded-2xl shadow-md overflow-hidden w-full h-full">
        <img src={restaurant.backgroundImg} alt="restaurant" className="w-full h-48 object-cover rounded-t-2xl" />
        <div className="p-4">
          <p className="text-lg font-bold leading-tight mb-1 text-xl">
            {restaurant.googleMapsUrl ? (
              <a
                href={restaurant.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline focus:underline"
              >
                {restaurant.name}
              </a>
            ) : (
              restaurant.name
            )}
          </p>
          <div className="flex items-center text-sm text-muted-foreground gap-1 mb-3">
            <img src={Pin} alt="location" className="w-4 h-4 object-contain" />
            <p className="truncate">{restaurant.address}</p>
          </div>
          <div className="flex items-center text-sm text-muted-foreground gap-1 mb-3">
            <Rating rating={restaurant.avgRating} showValue={false} />
                <p>({restaurant.avgRating})</p>
          </div>  
              {isOwner && (
            <div className="mt-2">
              {editing ? (
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={newUrl}
                    onChange={e => setNewUrl(e.target.value)}
                    placeholder="Google Maps URL"
                    className="border rounded px-2 py-1 text-sm w-64"
                  />
                  <button onClick={handleUpdateGoogleMapsUrl} className="bg-primary text-white px-3 py-1 rounded text-sm">Save</button>
                  <button onClick={() => setEditing(false)} className="text-xs text-muted-foreground">Cancel</button>
                </div>
              ) : (
                <button onClick={() => setEditing(true)} className="text-xs text-primary underline">Update Google Maps Link</button>
              )}
            </div>
          )}
        </div>
    </div>
  )
}

export default RestaurantCard

