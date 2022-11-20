const CALCULATE = {
    /**
     * Rounds to 2 decimals after .
     */
    percentageChange(fromNum: number, toNum: number): string {
        const percentageChange =
            (Math.round((toNum / fromNum) * 10000) - 10000) / 100;
        let percentStr = percentageChange.toString();
        // Chop off excess decimals
        percentStr =
            percentStr.indexOf('.') > -1
                ? this.sliceDigits(percentStr, 4)
                : percentStr;
        return percentStr;
    },

    sliceDigits(s: string, digits: number = 6): string {
        /**
         * @description Chops off extra digits in an number
         * @return string Returns the default string if its length does not
         *         exceeds the digits provided in the function
         * @param s<string> number in string form to be provided
         * @param digits<number> Number of digits to preserve including
         *        decimal '.'
         */

        // we do not care for the decimal point here as its a general func
        let st: string = s;
        if (st.length > digits === false) return st; //its smaller than maximum limit
        // Taking care of negative numbers
        st =
            st.indexOf('-') > -1
                ? st.slice(0, digits + 1)
                : st.slice(0, digits);
        return st;
    },
};
