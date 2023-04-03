module.exports = {
    format_date: (date) => {
        return date.toLocaleDateString();
    },

    trim_name: (username) => {
        if(!username){
            return "anonymous";
        }

        const name = [];
        for (let i = 0; i < username.length; i++){
            if (username[i] === "@"){
                break;
            }
            name.push(username[i]);
        }
        return name.join('');
    }
};