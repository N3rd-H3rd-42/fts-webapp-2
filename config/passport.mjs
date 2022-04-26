import passportLocal from 'passport-local';
import bcrypt from 'bcrypt';

export const initializePassportStrategy = (
  passport,
  getUserByEmail,
  getUserById
) => {
  const authenticateUser = async (email, password, done) => {
    const user = getUserByEmail(email);
    if (user == null) {
      return done(null, false, { message: 'No user with that email' });
    }

    try {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Password incorrect' });
      }
    } catch (error) {
      return done(error);
    }
  };
  passport.use(
    new passportLocal.Strategy({ usernameField: 'email' }, authenticateUser)
  );
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => done(null, getUserById(id)));
};
