import axios from "axios";

axios.defaults.baseURL = "https://todo-api-18-140-52-65.rakamin.com";

const clientToken = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyNSwiZXhwIjoxNjgwNDIwMzcwfQ.JVgrQUFIqcmAHusdmfxqtIAl309ZaFeR6hrBZyRCzAQ'

axios.defaults.headers.common = {'Authorization': `bearer ${clientToken}`}




