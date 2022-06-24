
const close = 0.03;

export const DeadCross = {
    isClose: value => {
        return value < close && value > -close
    },
    LOW_BORDER: -0.1,
    HIGH_BORDER: 0.1
}