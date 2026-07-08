"use client";

import React, { useState, useTransition } from "react";
import { Badge } from "@/components/ui/primitives";
import { motion } from "framer-motion";
import {
  User,
  Shield,
  Key,
  Database,
  CheckCircle,
  WarningTriangle,
  InfoCircle,
} from "iconoir-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateProfileSchema, type UpdateProfileInput } from "@/lib/validations/settings";
import {
  updateProfile,
  enrollMfa,
  confirmMfaEnroll,
  disableMfa,
  revokeSession,
} from "@/actions/settings";

type TabId = "profile" | "mfa" | "sessions" | "audit";

interface SettingsPanelProps {
  currentUser: {
    id: string;
    name: string;
    email: string;
    phone?: string | null;
    avatarUrl?: string | null;
    userType: "client" | "internal";
    twoFactorEnabled: boolean;
  };
  initialSessions: any[];
  initialAuditLogs: any[];
}

export function SettingsPanel({
  currentUser,
  initialSessions,
  initialAuditLogs,
}: SettingsPanelProps) {
  const [activeTab, setActiveTab] = useState<TabId>("profile");
  const [sessionsList, setSessionsList] = useState<any[]>(initialSessions);
  const [auditLogsList] = useState<any[]>(initialAuditLogs);
  
  // Profile State
  const [userProfile, setUserProfile] = useState(currentUser);
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);

  // MFA State
  const [mfaEnabled, setMfaEnabled] = useState(currentUser.twoFactorEnabled);
  const [mfaQrCode, setMfaQrCode] = useState<string | null>(null);
  const [mfaSetupCode, setMfaSetupCode] = useState("");
  const [mfaPassword, setMfaPassword] = useState("");
  const [mfaError, setMfaError] = useState<string | null>(null);
  const [mfaSuccess, setMfaSuccess] = useState<string | null>(null);

  const [isPending, startTransition] = useTransition();

  // Profile Form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<UpdateProfileInput>({
    resolver: zodResolver(UpdateProfileSchema),
    mode: "onChange",
    defaultValues: {
      name: userProfile.name,
      phone: userProfile.phone || "",
      avatarUrl: userProfile.avatarUrl || "",
    },
  });
  const profileName = watch("name") ?? "";
  const profileAvatarUrl = watch("avatarUrl") ?? "";

  const handleUpdateProfile = handleSubmit((data) => {
    setProfileError(null);
    setProfileSuccess(false);

    // Optimistic UI update
    const prevProfile = { ...userProfile };
    setUserProfile((prev) => ({
      ...prev,
      name: data.name,
      phone: data.phone,
      avatarUrl: data.avatarUrl,
    }));

    startTransition(async () => {
      const res = await updateProfile(data);
      if (res.error) {
        setProfileError(res.error.message);
        setUserProfile(prevProfile); // Rollback
      } else {
        setProfileSuccess(true);
      }
    });
  });

  // MFA Actions
  const handleEnrollMfa = () => {
    if (mfaPassword.length < 8) {
      setMfaError("Please enter your current password before setting up MFA.");
      return;
    }
    setMfaError(null);
    setMfaSuccess(null);
    startTransition(async () => {
      const res = await enrollMfa({ password: mfaPassword });
      if (res.error) {
        setMfaError(res.error.message);
      } else if (res.data) {
        setMfaQrCode(res.data.qrCode);
      }
    });
  };

  const handleConfirmMfa = () => {
    if (!mfaSetupCode.trim()) return;
    setMfaError(null);
    startTransition(async () => {
      const res = await confirmMfaEnroll({ code: mfaSetupCode });
      if (res.error) {
        setMfaError(res.error.message);
      } else {
        setMfaEnabled(true);
        setMfaQrCode(null);
        setMfaSetupCode("");
        setMfaPassword("");
        setMfaSuccess("MFA successfully enabled on your account.");
      }
    });
  };

  const handleDisableMfa = () => {
    if (mfaPassword.length < 8) {
      setMfaError("Please enter your current password before disabling MFA.");
      return;
    }

    setMfaError(null);
    startTransition(async () => {
      const res = await disableMfa({ password: mfaPassword });
      if (res.error) {
        setMfaError(res.error.message);
      } else {
        setMfaEnabled(false);
        setMfaPassword("");
        setMfaSuccess("MFA has been disabled.");
      }
    });
  };

  // Session Actions
  const handleRevokeSession = (token: string) => {
    if (!confirm("Are you sure you want to revoke this session?")) return;

    const previousSessions = [...sessionsList];
    setSessionsList((prev) => prev.filter((s) => s.token !== token));

    startTransition(async () => {
      const res = await revokeSession({ sessionId: token });
      if (res.error) {
        alert("Failed to revoke session: " + res.error.message);
        setSessionsList(previousSessions); // Rollback
      }
    });
  };

  const TABS: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: "profile", label: "Profile Settings", icon: <User className="w-4 h-4" /> },
    { id: "mfa", label: "Security & MFA", icon: <Shield className="w-4 h-4" /> },
    { id: "sessions", label: "Active Sessions", icon: <Key className="w-4 h-4" /> },
    { id: "audit", label: "Audit Logs", icon: <Database className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Account Settings</h1>
          <p className="text-white/60 text-sm">
            Manage your personal profile, configure multi-factor authentication, monitor active sessions, and view audit trails.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap gap-1 p-1 bg-white/[0.03] border border-white/[0.06] rounded-xl w-fit">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[#0BBDF4] text-black shadow-md"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Panel Card */}
        <div className="border border-white/[0.06] bg-neutral-950/40 rounded-xl p-6 md:p-8">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15 }}
          >
            {/* 1. PROFILE TAB */}
            {activeTab === "profile" && (
              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <h2 className="text-lg font-bold text-white mb-4">Edit Profile</h2>

                {profileSuccess && (
                  <div className="flex items-center gap-2 px-4 py-3 bg-green-500/10 border border-green-500/20 text-xs text-green-400 rounded-lg">
                    <CheckCircle className="w-4 h-4 shrink-0" />
                    Profile changes successfully updated.
                  </div>
                )}
                {profileError && (
                  <div className="flex items-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/20 text-xs text-red-400 rounded-lg">
                    <WarningTriangle className="w-4 h-4 shrink-0" />
                    {profileError}
                  </div>
                )}

                <p className="text-xs text-white/40">
                  Required fields are marked with <span className="text-[#0BBDF4]">*</span>. The save button stays disabled until the profile is valid.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label htmlFor="name-input" className="text-xs font-semibold text-white/60">
                      Full Name <span className="text-[#0BBDF4]">*</span>
                    </label>
                    <input
                      id="name-input"
                      type="text"
                      {...register("name")}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-[#0BBDF4]/40 transition-all"
                    />
                    {errors.name && <span className="text-xs text-red-400">{errors.name.message}</span>}
                    <div className="text-[10px] text-white/35">{profileName.length}/100 characters</div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label htmlFor="phone-input" className="text-xs font-semibold text-white/60">Phone Number</label>
                    <input
                      id="phone-input"
                      type="text"
                      {...register("phone")}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-[#0BBDF4]/40 transition-all"
                    />
                    {errors.phone && <span className="text-xs text-red-400">{errors.phone.message}</span>}
                  </div>

                  {/* Avatar URL */}
                  <div className="space-y-2 md:col-span-2">
                    <label htmlFor="avatar-input" className="text-xs font-semibold text-white/60">
                      Avatar URL <span className="text-white/30">(optional)</span>
                    </label>
                    <input
                      id="avatar-input"
                      type="text"
                      {...register("avatarUrl")}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-[#0BBDF4]/40 transition-all"
                    />
                    {errors.avatarUrl && <span className="text-xs text-red-400">{errors.avatarUrl.message}</span>}
                    <div className="text-[10px] text-white/35">{profileAvatarUrl.length}/2048 characters</div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || isPending || !isValid}
                  className="px-5 py-2.5 rounded-lg text-xs font-semibold bg-[#0BBDF4] text-black hover:bg-[#0BBDF4]/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
                >
                  {isSubmitting || isPending ? "Saving..." : "Save Changes"}
                </button>
              </form>
            )}

            {/* 2. MFA TAB */}
            {activeTab === "mfa" && (
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-lg font-bold text-white mb-1">Multi-Factor Authentication (MFA)</h2>
                    <p className="text-xs text-white/40 max-w-lg">
                      Secure your account by adding an additional layer of verification. Internal Onyx staff are required to enable MFA.
                    </p>
                  </div>
                  <Badge variant={mfaEnabled ? "green" : "danger"}>
                    {mfaEnabled ? "MFA Active" : "Disabled"}
                  </Badge>
                </div>

                {mfaError && (
                  <div className="flex items-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/20 text-xs text-red-400 rounded-lg">
                    <WarningTriangle className="w-4 h-4 shrink-0" />
                    {mfaError}
                  </div>
                )}
                {mfaSuccess && (
                  <div className="flex items-center gap-2 px-4 py-3 bg-green-500/10 border border-green-500/20 text-xs text-green-400 rounded-lg">
                    <CheckCircle className="w-4 h-4 shrink-0" />
                    {mfaSuccess}
                  </div>
                )}

                {currentUser.userType !== "internal" ? (
                  <div className="flex items-center gap-3 p-4 bg-white/[0.02] border border-white/10 rounded-xl text-xs text-white/50">
                    <InfoCircle className="w-4 h-4 text-[#0BBDF4] shrink-0" />
                    Client users are exempt from mandatory MFA and are managed via standard identity credentials.
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="space-y-2 max-w-sm">
                      <label htmlFor="mfa-password" className="text-xs font-semibold text-white/60">
                        Current Password
                      </label>
                      <input
                        id="mfa-password"
                        type="password"
                        autoComplete="current-password"
                        value={mfaPassword}
                        onChange={(e) => setMfaPassword(e.target.value)}
                        placeholder="Enter your password to confirm"
                        className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-[#0BBDF4]/40 transition-all"
                      />
                    </div>

                    {!mfaEnabled && !mfaQrCode && (
                      <button
                        onClick={handleEnrollMfa}
                        disabled={isPending || mfaPassword.length < 8}
                        className="px-5 py-2.5 rounded-lg text-xs font-semibold bg-[#0BBDF4] text-black hover:bg-[#0BBDF4]/90 disabled:opacity-40 transition-all cursor-pointer"
                      >
                        {isPending ? "Generating..." : "Setup Authenticator App"}
                      </button>
                    )}

                    {mfaQrCode && (
                      <div className="space-y-4 border border-white/10 p-6 bg-white/[0.01] rounded-xl max-w-sm">
                        <span className="text-xs font-semibold text-white/80 block">Step 1: Scan this QR Code</span>
                        <div className="p-3 bg-white rounded-lg inline-block">
                          {/* Simple placeholder QR or standard rendering */}
                          <div className="w-40 h-40 bg-neutral-200 flex items-center justify-center text-black text-center text-xs font-mono p-4 break-words">
                            {mfaQrCode.substring(0, 45)}...
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="totp-code" className="text-xs font-semibold text-white/60 block">Step 2: Enter 6-digit verification code</label>
                          <div className="flex gap-2">
                            <input
                              id="totp-code"
                              type="text"
                              maxLength={6}
                              inputMode="numeric"
                              autoComplete="one-time-code"
                              placeholder="000000"
                              value={mfaSetupCode}
                              onChange={(e) => setMfaSetupCode(e.target.value)}
                              className="bg-white/[0.04] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none w-28 text-center tracking-widest font-mono"
                            />
                            <button
                              onClick={handleConfirmMfa}
                              disabled={isPending || mfaSetupCode.length !== 6}
                              className="px-4 py-2 bg-[#0BBDF4] text-black text-xs font-semibold rounded-lg hover:bg-[#0BBDF4]/90 disabled:opacity-40 transition-all cursor-pointer"
                            >
                              Verify
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {mfaEnabled && (
                      <button
                        onClick={handleDisableMfa}
                        disabled={isPending || mfaPassword.length < 8}
                        className="px-5 py-2.5 rounded-lg text-xs font-semibold border border-red-500/30 hover:bg-red-500/10 text-red-400 transition-all cursor-pointer"
                      >
                        {isPending ? "Deactivating..." : "Disable Authenticator App"}
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* 3. ACTIVE SESSIONS TAB */}
            {activeTab === "sessions" && (
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-white mb-4">Active Access Sessions</h2>
                <div className="rounded-xl border border-white/[0.06] overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/[0.06] bg-white/[0.01] text-xs font-semibold text-white/40 uppercase">
                        <th className="px-6 py-4">Device / Browser</th>
                        <th className="px-6 py-4">IP Address</th>
                        <th className="px-6 py-4">Expires</th>
                        <th className="px-6 py-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.04] text-sm text-white/80">
                      {sessionsList.map((session) => (
                        <tr key={session.id} className="hover:bg-white/[0.02]">
                          <td className="px-6 py-4 font-mono text-xs">
                            {session.userAgent || "Unknown Device"}
                          </td>
                          <td className="px-6 py-4 text-white/60 font-mono text-xs">
                            {session.ipAddress || "Unknown"}
                          </td>
                          <td className="px-6 py-4 text-white/60 text-xs">
                            {new Date(session.expiresAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() => handleRevokeSession(session.token)}
                              className="text-xs text-red-400 hover:text-red-300 border border-red-500/20 hover:border-red-500/40 bg-red-500/5 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                            >
                              Revoke
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 4. AUDIT LOGS TAB */}
            {activeTab === "audit" && (
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-white mb-4">Security Audit Trails</h2>
                <div className="rounded-xl border border-white/[0.06] overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/[0.06] bg-white/[0.01] text-xs font-semibold text-white/40 uppercase">
                        <th className="px-6 py-4">Action</th>
                        <th className="px-6 py-4">Resource</th>
                        <th className="px-6 py-4">IP Address</th>
                        <th className="px-6 py-4">Date & Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.04] text-sm text-white/80">
                      {auditLogsList.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="px-6 py-8 text-center text-white/30 text-xs">
                            No logs found for this account scope.
                          </td>
                        </tr>
                      ) : (
                        auditLogsList.map((log) => (
                          <tr key={log.id} className="hover:bg-white/[0.02]">
                            <td className="px-6 py-4 font-semibold text-xs text-white">
                              {log.action}
                            </td>
                            <td className="px-6 py-4 text-white/60 text-xs font-mono">
                              {log.targetType || "N/A"}
                            </td>
                            <td className="px-6 py-4 text-white/60 font-mono text-xs">
                              {log.ipAddress || "Unknown"}
                            </td>
                            <td className="px-6 py-4 text-white/40 text-xs">
                              {new Date(log.createdAt).toLocaleString()}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
