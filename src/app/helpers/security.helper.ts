import { timer } from 'rxjs';

// Helpers
import { TimeHelper } from './time.helper';
import { environment } from 'src/environments/environment';

export const SecurityHelper = {

    checkSession: (timeStart: number, timeInterval: number, expireIn = 0) => {

        const subcription = timer(timeStart, timeInterval)
            .subscribe(() => {

                // Si expiró
                if ( TimeHelper.isExpired(expireIn) ) {

                    subcription.unsubscribe();
                    localStorage.removeItem('token');
                    
                    window.location.href = `${window.origin}${environment.pathGit}`;
                }
            });
    },

    expiredToken: () => {

        const metadata = localStorage.getItem('token');
        if ( metadata == null ) { return true; }

        const expiredIn = JSON.parse(metadata).expireIn;

        return TimeHelper.isExpired(expiredIn);
    },

    getToken: () => {

        const metadata = localStorage.getItem('token');
        if ( metadata == null ) { return null; }

        const token = JSON.parse(metadata);

        return token;
    }
};