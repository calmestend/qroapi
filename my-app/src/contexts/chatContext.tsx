import { createContext, useContext, useState } from "react";

export interface ChatResponse {
	response: string | null;
	origin: string | null;
	destination: string | null;
}

export interface ChatContextType {
	chatResponse: ChatResponse | null;
	setChatResponse: (response: ChatResponse | null) => void;
}

export const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
	children
}) => {
	const [chatResponse, setChatResponse] = useState<ChatResponse | null>(null);

	return (
		<ChatContext.Provider
			value={{
				chatResponse,
				setChatResponse
			}}
		>
			{children}
		</ChatContext.Provider>
	);
};

export const useChat = () => {
	const context = useContext(ChatContext);
	if (!context) {
		throw new Error('useChat must be used within a ChatProvider');
	}
	return context;
};

