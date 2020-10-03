import {environment} from '../../environments/environment';

export const BASE_URL = environment.baseUrl;


export const EMAIL_REGEX: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const SPLIT_REGEX: RegExp = /\W+/;

export const NUMBER_REGEX: RegExp = new RegExp('^\\d+$');

