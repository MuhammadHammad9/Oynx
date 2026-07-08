"use client";

import React, { useState, useRef, useEffect, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Attachment, CheckCircle } from "iconoir-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SendMessageSchema, type SendMessageInput } from "@/lib/validations/messages";
import { sendMessage } from "@/actions/send-message";

// ─── Types ────────────────────────────────────────────────────────────────────

interface MessageSender {
  id: string;
  name: string;
  avatarUrl?: string | null;
}

interface Message {
  id: string;
  body: string;
  createdAt: string | Date;
  editedAt?: string | Date | null;
  sender: MessageSender | null;
  isOptimistic?: boolean;
}

interface MessagesTabProps {
  projectId: string;
  currentUserId: string;
  currentUserName: string;
  currentUserAvatarUrl?: string | null;
  /** Pre-fetched initial messages from server */
  initialMessages: Message[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatTimestamp(date: string | Date): string {
  const d = new Date(date);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const mins = Math.floor(diff / 60000);

  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  if (mins < 1440) return `${Math.floor(mins / 60)}h ago`;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// ─── Avatar Component ─────────────────────────────────────────────────────────

function Avatar({ name, avatarUrl, size = 32 }: { name: string; avatarUrl?: string | null; size?: number }) {
  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={name}
        style={{ width: size, height: size }}
        className="rounded-full object-cover border border-white/10 shrink-0"
      />
    );
  }
  return (
    <div
      style={{ width: size, height: size, fontSize: size * 0.35 }}
      className="rounded-full bg-[#0BBDF4]/20 text-[#0BBDF4] border border-[#0BBDF4]/30 flex items-center justify-center font-bold shrink-0"
    >
      {getInitials(name)}
    </div>
  );
}

// ─── Message Bubble ───────────────────────────────────────────────────────────

function MessageBubble({
  message,
  isOwn,
}: {
  message: Message;
  isOwn: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: message.isOptimistic ? 0.7 : 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`flex items-end gap-3 ${isOwn ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Avatar */}
      {!isOwn && (
        <Avatar
          name={message.sender?.name ?? "Unknown"}
          avatarUrl={message.sender?.avatarUrl}
          size={28}
        />
      )}

      {/* Bubble */}
      <div className={`max-w-[70%] flex flex-col gap-1 ${isOwn ? "items-end" : "items-start"}`}>
        {/* Sender name */}
        {!isOwn && (
          <span className="text-[10px] text-white/40 ml-1">
            {message.sender?.name ?? "Unknown"}
          </span>
        )}

        <div
          className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
            isOwn
              ? "bg-[#0BBDF4] text-black rounded-br-sm font-medium"
              : "bg-white/[0.06] text-white border border-white/[0.06] rounded-bl-sm"
          }`}
        >
          {message.body}
        </div>

        <div className="flex items-center gap-1.5 px-1">
          <span className="text-[10px] text-white/25">
            {formatTimestamp(message.createdAt)}
          </span>
          {message.editedAt && (
            <span className="text-[10px] text-white/20">(edited)</span>
          )}
          {isOwn && message.isOptimistic && (
            <span className="text-[10px] text-white/30">Sending...</span>
          )}
          {isOwn && !message.isOptimistic && (
            <CheckCircle className="w-3 h-3 text-[#0BBDF4]/60" />
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Date Divider ─────────────────────────────────────────────────────────────

function DateDivider({ date }: { date: string }) {
  return (
    <div className="flex items-center gap-3 py-2">
      <div className="flex-1 h-px bg-white/[0.06]" />
      <span className="text-[10px] text-white/25 font-medium tracking-wider uppercase">
        {date}
      </span>
      <div className="flex-1 h-px bg-white/[0.06]" />
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyMessages() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 py-16 text-center">
      <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
        <Send className="w-7 h-7 text-white/20" />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-white/60 mb-1">No messages yet</h3>
        <p className="text-xs text-white/30 max-w-64">
          Send the first message to start the conversation with your project team.
        </p>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function MessagesTab({
  projectId,
  currentUserId,
  currentUserName,
  currentUserAvatarUrl,
  initialMessages,
}: MessagesTabProps) {
  const [messageList, setMessageList] = useState<Message[]>(initialMessages);
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<SendMessageInput>({
    resolver: zodResolver(SendMessageSchema),
    mode: "onChange",
    defaultValues: { projectId, body: "", attachmentFileIds: [] },
  });

  const body = watch("body");

  // Scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messageList]);

  // Auto-resize textarea
  const handleTextareaInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const el = e.currentTarget;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 140)}px`;
  };

  const handleSend = handleSubmit((data) => {
    if (!data.body.trim()) return;

    // Optimistic update
    const optimisticMsg: Message = {
      id: `optimistic-${Date.now()}`,
      body: data.body,
      createdAt: new Date(),
      sender: { id: currentUserId, name: currentUserName, avatarUrl: currentUserAvatarUrl },
      isOptimistic: true,
    };
    setMessageList((prev) => [...prev, optimisticMsg]);
    setServerError(null);

    // Reset form immediately for UX
    reset({ projectId, body: "", attachmentFileIds: [] });
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
    }

    startTransition(async () => {
      const result = await sendMessage(data);

      if (result.error) {
        // Revert optimistic message on failure
        setMessageList((prev) =>
          prev.filter((m) => m.id !== optimisticMsg.id)
        );
        setServerError(result.error.message);
        return;
      }

      // Replace optimistic message with confirmed one
      setMessageList((prev) =>
        prev.map((m) =>
          m.id === optimisticMsg.id
            ? { ...m, id: result.data.messageId, isOptimistic: false }
            : m
        )
      );
    });
  });

  // Handle Ctrl+Enter or Enter (without Shift) to send
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Group messages by date for dividers
  const groupedMessages = messageList.reduce<{ date: string; messages: Message[] }[]>(
    (groups, msg) => {
      const d = new Date(msg.createdAt);
      const dateKey = d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      const last = groups[groups.length - 1];
      if (last && last.date === dateKey) {
        last.messages.push(msg);
      } else {
        groups.push({ date: dateKey, messages: [msg] });
      }
      return groups;
    },
    []
  );

  return (
    <div className="flex flex-col h-[600px] rounded-xl border border-white/[0.06] bg-neutral-950/50 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.06] bg-white/[0.01] shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.6)]" />
          <span className="text-xs font-semibold text-white/70">Project Conversation</span>
        </div>
        <span className="text-[10px] text-white/25">{messageList.length} messages</span>
      </div>

      {/* Message Feed */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-5 py-4 space-y-4 scroll-smooth"
        style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.06) transparent" }}
      >
        {messageList.length === 0 ? (
          <EmptyMessages />
        ) : (
          <AnimatePresence initial={false}>
            {groupedMessages.map((group) => (
              <div key={group.date} className="space-y-3">
                <DateDivider date={group.date} />
                {group.messages.map((msg) => (
                  <MessageBubble
                    key={msg.id}
                    message={msg}
                    isOwn={msg.sender?.id === currentUserId}
                  />
                ))}
              </div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Error Banner */}
      <AnimatePresence>
        {serverError && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-5 py-2 bg-red-500/10 border-t border-red-500/20 text-xs text-red-400"
          >
            {serverError} — please try again.
          </motion.div>
        )}
      </AnimatePresence>

      {/* Composer */}
      <form
        onSubmit={handleSend}
        className="px-4 py-3 border-t border-white/[0.06] bg-white/[0.01] shrink-0"
      >
        <div
          className={`flex items-end gap-2 bg-white/[0.04] rounded-xl border transition-colors ${
            errors.body ? "border-red-500/40" : "border-white/[0.08] focus-within:border-[#0BBDF4]/40"
          } p-2 pl-4`}
        >
          {/* Textarea */}
          <textarea
            {...register("body", {
              setValueAs: (v: string) => v,
            })}
            id="message-composer"
            placeholder="Write a message... (Enter to send, Shift+Enter for newline)"
            aria-label="Message composer"
            rows={1}
            onInput={handleTextareaInput}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent resize-none outline-none text-sm text-white placeholder:text-white/25 leading-relaxed py-1 min-h-[32px] max-h-[140px] overflow-y-auto"
            style={{ scrollbarWidth: "none" }}
          />

          {/* Attachment button (scaffold - full upload in Phase 4+) */}
          <button
            type="button"
            aria-label="Attach file"
            className="w-8 h-8 flex items-center justify-center text-white/30 hover:text-white/60 transition-colors rounded-lg hover:bg-white/[0.04]"
          >
            <Attachment className="w-4 h-4" />
          </button>

          {/* Send button */}
          <button
            type="submit"
            disabled={!body?.trim() || isPending || !isValid}
            aria-label="Send message"
            className="w-8 h-8 flex items-center justify-center rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed bg-[#0BBDF4] text-black hover:bg-[#0BBDF4]/90 active:scale-95"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-2 flex items-center justify-between px-1 text-[10px] text-white/30">
          <span>{body?.length ?? 0}/4000 characters</span>
          <span>Required: message body</span>
        </div>

        {errors.body && (
          <p className="text-xs text-red-400 mt-1 ml-1">{errors.body.message}</p>
        )}
      </form>
    </div>
  );
}
