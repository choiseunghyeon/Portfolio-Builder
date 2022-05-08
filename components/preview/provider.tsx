import Career from "./career/Career";
import Profile from "./profile/Profile";
import Project from "./project/Project";

export const previewProvider: { [key: string]: any } = {
  Profile: Profile,
  Career: Career,
  Project: Project,
};
