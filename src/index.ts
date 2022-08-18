import express from 'express'
import cors from 'cors'
import { testRouter } from './router/TestRouter';
import { userRouter } from './router/UserRouter';
import { showRouter } from './router/ShowRouter';

const app = express();

app.use(express.json());
app.use(cors());

app.listen(process.env.PORT || 3003, () => {
  console.log(`Server is running on port ${process.env.PORT || 3003}`)
});

app.use("/test", testRouter)
app.use("/users", userRouter)
app.use("/shows", showRouter)