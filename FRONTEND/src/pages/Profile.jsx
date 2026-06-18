import { useState } from "react";
import { User, Mail, Shield, Key, Camera, X } from "lucide-react";
import { useAuthStore } from "../store/authStore";

const Profile = () => {
  const { user } = useAuthStore();
  
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const firstName = user?.first_name || user?.given_name || user?.name?.split(' ')[0] || user?.full_name?.split(' ')[0] || "Guest";
  const lastName = user?.last_name || user?.family_name || user?.name?.split(' ').slice(1).join(' ') || user?.full_name?.split(' ').slice(1).join(' ') || "";
  const email = user?.email || "";
  const fullName = user?.full_name || user?.name || `${firstName} ${lastName}`.trim();
  const profilePicture = user?.picture || null;

  const handleUpdatePassword = async () => {
    try {
      const response = await fetch("http://localhost:8000/auth/update-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, old_password: oldPassword, new_password: newPassword })
      });
      if (response.ok) {
        alert("Password updated successfully");
        setShowPasswordModal(false);
      } else {
        const data = await response.json();
        alert(data.detail || "Failed to update password");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating password");
    }
  };

  const handleGenerate2FA = async () => {
    try {
      const response = await fetch("http://localhost:8000/auth/2fa/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      if (response.ok) {
        const data = await response.json();
        setQrCodeUrl(data.qr_code);
        setShow2FAModal(true);
      } else {
        alert("Failed to generate 2FA");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleVerify2FA = async () => {
    try {
      const response = await fetch("http://localhost:8000/auth/2fa/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: verificationCode })
      });
      if (response.ok) {
        alert("2FA verified and enabled successfully!");
        setShow2FAModal(false);
      } else {
        const data = await response.json();
        alert(data.detail || "Invalid 2FA code");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">User Profile</h1>
        <p className="text-[#A8A8A8] mt-1">Manage your personal information and security.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Avatar & Basic Info */}
        <div className="glass-panel p-6 rounded-xl flex flex-col items-center text-center space-y-4">
          <div className="relative group cursor-pointer">
            <div className="w-32 h-32 rounded-full bg-[#121212] border-2 border-black overflow-hidden flex items-center justify-center relative ">
               {profilePicture ? (
                 <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
               ) : (
                 <User className="w-12 h-12 text-zinc-500" />
               )}
               <div className="absolute inset-0 bg-transparent/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                 <Camera className="w-6 h-6 text-white mb-1" />
                 <span className="text-xs font-medium text-white">Change</span>
               </div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{fullName}</h2>
            <p className="text-sm text-[#F50057] font-medium mt-1">Pro Creator</p>
          </div>
          <p className="text-sm text-[#A8A8A8] px-4">
            Digital marketer and content creator building brands in the tech space.
          </p>
        </div>

        {/* Right Column: Details & Forms */}
        <div className="md:col-span-2 space-y-6">
          <div className="glass-panel p-6 rounded-xl space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-[#363636] pb-4">
              <User className="w-5 h-5 text-[#F50057]" /> Personal Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-[#A8A8A8] uppercase tracking-wider">First Name</label>
                <input type="text" defaultValue={firstName} className="w-full bg-transparent border border-[#363636] rounded-lg p-2.5 text-white outline-none focus:border-primary transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-[#A8A8A8] uppercase tracking-wider">Last Name</label>
                <input type="text" defaultValue={lastName} className="w-full bg-transparent border border-[#363636] rounded-lg p-2.5 text-white outline-none focus:border-primary transition-colors" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <label className="text-xs font-medium text-[#A8A8A8] uppercase tracking-wider flex items-center gap-2">
                  <Mail className="w-3 h-3" /> Email Address
                </label>
                <input type="email" defaultValue={email} readOnly className="w-full bg-transparent/50 border border-[#363636] rounded-lg p-2.5 text-white/70 outline-none cursor-not-allowed" />
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button className="bg-white/5 hover:bg-white/10 border border-[#363636] text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors">
                Save Changes
              </button>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-xl space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-[#363636] pb-4">
              <Shield className="w-5 h-5 text-[#F50057]" /> Security
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-transparent/50 border border-[#363636] rounded-lg">
                <div className="flex items-center gap-3">
                  <Key className="w-5 h-5 text-[#A8A8A8]" />
                  <div>
                    <h4 className="text-sm font-medium text-white">Password</h4>
                    <p className="text-xs text-zinc-500 mt-0.5">Last changed 3 months ago</p>
                  </div>
                </div>
                <button onClick={() => setShowPasswordModal(true)} className="text-sm font-medium text-[#F50057] hover:text-[#F50057]/80 transition-colors">Update</button>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-transparent/50 border border-[#363636] rounded-lg">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-[#A8A8A8]" />
                  <div>
                    <h4 className="text-sm font-medium text-white">Two-Factor Authentication</h4>
                    <p className="text-xs text-zinc-500 mt-0.5">Add an extra layer of security</p>
                  </div>
                </div>
                <button onClick={handleGenerate2FA} className="text-sm font-medium text-[#F50057] hover:text-[#F50057]/80 transition-colors">Enable</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent/80 backdrop-blur-sm">
          <div className="bg-transparent border border-[#363636] p-6 rounded-xl w-full max-w-md shadow-2xl relative">
            <button onClick={() => setShowPasswordModal(false)} className="absolute top-4 right-4 text-[#A8A8A8] hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold text-white mb-4">Update Password</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-[#A8A8A8] uppercase tracking-wider">Old Password</label>
                <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className="w-full bg-transparent border border-[#363636] rounded-lg p-2.5 text-white outline-none focus:border-primary transition-colors" placeholder="Leave empty if setting for the first time" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-[#A8A8A8] uppercase tracking-wider">New Password</label>
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full bg-transparent border border-[#363636] rounded-lg p-2.5 text-white outline-none focus:border-primary transition-colors" placeholder="Enter new password" />
              </div>
              <button onClick={handleUpdatePassword} className="w-full insta-gradient text-white hover:opacity-90 font-bold py-2.5 rounded-lg transition-colors mt-2">
                Save Password
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2FA Modal */}
      {show2FAModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent/80 backdrop-blur-sm">
          <div className="bg-transparent border border-[#363636] p-6 rounded-xl w-full max-w-md shadow-2xl relative text-center">
            <button onClick={() => setShow2FAModal(false)} className="absolute top-4 right-4 text-[#A8A8A8] hover:text-white">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold text-white mb-2">Enable 2FA</h3>
            <p className="text-sm text-[#A8A8A8] mb-6">Scan this QR code with Google Authenticator or Authy to set up two-factor authentication.</p>
            {qrCodeUrl && (
              <div className="flex justify-center mb-6">
                <img src={qrCodeUrl} alt="QR Code" className="w-48 h-48 rounded-lg bg-white p-2" />
              </div>
            )}
            <div className="space-y-4">
              <input type="text" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} className="w-full bg-transparent border border-[#363636] rounded-lg p-2.5 text-white text-center tracking-[0.5em] outline-none focus:border-primary transition-colors" placeholder="000000" maxLength="6" />
              <button onClick={handleVerify2FA} className="w-full insta-gradient text-white hover:opacity-90 font-bold py-2.5 rounded-lg transition-colors mt-2">
                Verify & Enable
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
