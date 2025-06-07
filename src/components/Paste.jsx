import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  function handleShare(paste) {
    const url = window.location.origin + `/pastes/${paste._id}`;
    const shareData = {
      title: paste.title || "Check this paste!",
      text: paste.value || "",
      url: url,
    };

    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => toast.success("Shared successfully!"))
        .catch((error) => {
          console.warn(
            "Share failed (probably unsupported on localhost):",
            error
          );
          navigator.clipboard.writeText(url);
          toast("Sharing not supported on this device, link copied instead!", {
            icon: "🔗",
          });
        });
    } else {
      navigator.clipboard.writeText(url);
      toast("Sharing not supported, link copied instead!", { icon: "🔗" });
    }
  }

  return (
    <div className="mt-6">
      List of all Pastes
      <br />
      <input
        className="p-2 rounded-2xl bg-black mt-2 pl-4 min-w-[500px]"
        type="search"
        placeholder="Search your pastes"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="flex flex-col gap-4 mt-4">
        {filteredData.length > 0 &&
          filteredData.map((paste) => {
            return (
              <>
                <div className="border" key={paste._id}>
                  <div> {paste.title}</div>
                  <div>{paste.value}</div>
                  <div className="flex flew-row gap-4 mt-2 place-content-evenly p-2">
                    <button>
                      <a href={`/?pasteId=${paste._id}`}>Edit</a>
                    </button>
                    <button onClick={() => handleDelete(paste)}>Delete</button>
                    <button>
                      <a href={`pastes/${paste._id}`}>View</a>
                    </button>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(paste?.value);
                        toast.success("Text copied to clipboard!");
                      }}
                    >
                      Copy
                    </button>
                    <button
                      onClick={() => {
                        handleShare(paste);
                      }}
                    >
                      Share
                    </button>
                  </div>
                  <div>
                    {new Date(paste.createdAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </div>
  );
};

export default Paste;
