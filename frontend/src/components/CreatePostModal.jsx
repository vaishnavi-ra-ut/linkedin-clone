// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { createPost } from '../slices/postsSlice';

// export default function CreatePostModal() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [text, setText] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { currentUser } = useSelector((state) => state.user);
//   const dispatch = useDispatch();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!text.trim()) return;
//     setLoading(true);
//     try {
//       await dispatch(createPost(text)).unwrap();
//       setText('');
//       setIsOpen(false);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {/* Mini card (like LinkedIn) */}
//       <div className="bg-white p-3 rounded-lg shadow flex items-center gap-3 max-w-2xl mx-auto mb-4">
//         <img
//           src="/default-avatar.png"
//           alt="user"
//           className="w-10 h-10 rounded-full"
//         />
//         <button
//           onClick={() => setIsOpen(true)}
//           className="flex-1 text-left border border-gray-300 rounded-full py-2 px-4 text-gray-500 hover:bg-gray-100"
//         >
//           Start a post
//         </button>
//       </div>

//       {/* Modal */}
//       {isOpen && (
//         <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
//           <div className="bg-white rounded-xl p-5 w-full max-w-md shadow-lg">
//             <h2 className="text-lg font-semibold mb-3">Create a Post</h2>
//             <form onSubmit={handleSubmit}>
//               <textarea
//                 value={text}
//                 onChange={(e) => setText(e.target.value)}
//                 placeholder="What's on your mind?"
//                 className="w-full p-2 border rounded-md h-28 resize-none"
//               />
//               <div className="flex justify-end mt-3 gap-2">
//                 <button
//                   type="button"
//                   onClick={() => setIsOpen(false)}
//                   className="px-4 py-2 border rounded-md"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="px-4 py-2 bg-blue-600 text-white rounded-md"
//                 >
//                   {loading ? 'Posting...' : 'Post'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
