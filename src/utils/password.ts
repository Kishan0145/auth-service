import bcrypt from 'bcrypt';
export const hashPassword = async (password: string) => {
   const iterations = 10;
   const hashPassWord = await bcrypt.hash(password, iterations);
   return hashPassWord;
};
