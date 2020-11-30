import { environment } from '../../environments/environment';

export const RouteHelper = {

    getNavigateRoot: () => {

        return `${window.location.href}${environment.pathGit}`;
    }
};