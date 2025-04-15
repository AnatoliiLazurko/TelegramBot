const messageStore = new Map();

function addMessage(userId, messageId) {
    if (!messageStore.has(userId)) {
        messageStore.set(userId, []);
    }
    messageStore.get(userId).push(messageId);
}

function getMessages(userId) {
    return messageStore.get(userId) || [];
}

function clearMessages(userId) {
    messageStore.delete(userId);
}

async function deleteAllMessages(ctx) {
    const messages = getMessages(ctx.from.id);
    for (const msgId of messages) {
        try {
            await ctx.telegram.deleteMessage(ctx.chat.id, msgId);
        } catch (e) {
            // console.log("❗ Помилка при видаленні:", e.message);
        }
    }
    clearMessages(ctx.from.id);
}

module.exports = {
    addMessage,
    getMessages,
    clearMessages,
    deleteAllMessages
};