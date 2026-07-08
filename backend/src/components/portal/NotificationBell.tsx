"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, CheckCircle, ChatBubble, Page, CreditCard, WarningTriangle } from "iconoir-react";
import { markAllNotificationsRead } from "@/actions/notifications";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface NotificationItem {
  id: string;
  type: string;
  payload: string; // stringified JSON
  readAt: Date | null;
  createdAt: Date;
}

interface NotificationBellProps {
  initialNotifications: NotificationItem[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function parsePayload(raw: string): Record<string, string> {
  try { return JSON.parse(raw); } catch { return {}; }
}

function getNotificationIcon(type: string) {
  const iconClass = "w-3.5 h-3.5";
  switch (type) {
    case "new_message": return <ChatBubble className={iconClass} />;
    case "milestone_completed":
    case "milestone_approved": return <CheckCircle className={iconClass} />;
    case "new_file": return <Page className={iconClass} />;
    case "invoice_issued":
    case "invoice_paid": return <CreditCard className={iconClass} />;
    default: return <WarningTriangle className={iconClass} />;
  }
}

function getNotificationIconColor(type: string): string {
  switch (type) {
    case "new_message": return "text-[#0BBDF4] bg-[#0BBDF4]/10";
    case "milestone_approved": return "text-green-400 bg-green-400/10";
    case "milestone_completed": return "text-blue-400 bg-blue-400/10";
    case "invoice_issued":
    case "invoice_paid": return "text-amber-400 bg-amber-400/10";
    default: return "text-white/40 bg-white/[0.04]";
  }
}

function getNotificationTitle(type: string, payload: Record<string, string>): string {
  switch (type) {
    case "new_message": return `${payload.senderName || "Someone"} sent a message`;
    case "milestone_completed": return "Milestone marked complete";
    case "milestone_approved": return "Milestone approved!";
    case "milestone_rejected": return "Milestone needs revision";
    case "new_file": return "New file uploaded";
    case "invoice_issued": return "Invoice issued";
    case "invoice_paid": return "Payment received";
    default: return "New notification";
  }
}

function formatRelativeTime(date: Date): string {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  if (mins < 1440) return `${Math.floor(mins / 60)}h ago`;
  return `${Math.floor(mins / 1440)}d ago`;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function NotificationBell({ initialNotifications }: NotificationBellProps) {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [isOpen, setIsOpen] = useState(false);
  const [isMarkingRead, setIsMarkingRead] = useState(false);

  const unreadCount = notifications.filter((n) => !n.readAt).length;

  const handleMarkAllRead = async () => {
    setIsMarkingRead(true);
    await markAllNotificationsRead();
    setNotifications((prev) => prev.map((n) => ({ ...n, readAt: n.readAt ?? new Date() })));
    setIsMarkingRead(false);
  };

  return (
    <div className="relative">
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ""}`}
        className="relative w-9 h-9 flex items-center justify-center rounded-xl text-white/50 hover:text-white hover:bg-white/[0.06] border border-transparent hover:border-white/[0.08] transition-all"
      >
        <Bell className="w-4.5 h-4.5" />
        <AnimatePresence>
          {unreadCount > 0 && (
            <motion.span
              key="badge"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 bg-[#0BBDF4] text-black text-[9px] font-bold rounded-full flex items-center justify-center"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* Dropdown Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.97 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute right-0 top-12 z-50 w-[340px] rounded-2xl bg-neutral-900 border border-white/[0.08] shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
                <span className="text-sm font-semibold text-white">Notifications</span>
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllRead}
                    disabled={isMarkingRead}
                    className="text-[11px] text-[#0BBDF4] hover:text-[#0BBDF4]/70 transition-colors disabled:opacity-50"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              {/* Notification List */}
              <div className="max-h-[380px] overflow-y-auto" style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.06) transparent" }}>
                {notifications.length === 0 ? (
                  <div className="flex flex-col items-center gap-3 py-10 text-center px-6">
                    <Bell className="w-8 h-8 text-white/10" />
                    <p className="text-xs text-white/30">You're all caught up</p>
                  </div>
                ) : (
                  <div className="divide-y divide-white/[0.04]">
                    {notifications.map((n) => {
                      const payload = parsePayload(n.payload);
                      return (
                        <motion.div
                          key={n.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className={`flex items-start gap-3 px-4 py-3 hover:bg-white/[0.03] transition-colors cursor-pointer ${
                            !n.readAt ? "bg-[#0BBDF4]/[0.02]" : ""
                          }`}
                        >
                          {/* Icon */}
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${getNotificationIconColor(n.type)}`}>
                            {getNotificationIcon(n.type)}
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <p className={`text-xs leading-relaxed ${n.readAt ? "text-white/50" : "text-white/80"}`}>
                              {getNotificationTitle(n.type, payload)}
                            </p>
                            {payload.projectName && (
                              <p className="text-[10px] text-white/30 mt-0.5 truncate">
                                {payload.projectName}
                              </p>
                            )}
                            {payload.preview && (
                              <p className="text-[10px] text-white/25 mt-1 line-clamp-2 leading-relaxed">
                                {payload.preview}
                              </p>
                            )}
                            <span className="text-[10px] text-white/20 mt-1 block">
                              {formatRelativeTime(n.createdAt)}
                            </span>
                          </div>

                          {/* Unread dot */}
                          {!n.readAt && (
                            <div className="w-1.5 h-1.5 rounded-full bg-[#0BBDF4] mt-1.5 shrink-0" />
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
