import morgan, { StreamOptions } from "morgan";

const stream: StreamOptions = {
  write: (message) => console.log(message.trim()),
};

export const logger = morgan(
  ":method :url :status - :response-time ms :date[iso]",
  { stream }
);
