
export const TimeHelper = {

    isExpired: (expireIn: number) => {

        return new Date(expireIn * 1000 ).getTime() < Date.now();
    }
};
