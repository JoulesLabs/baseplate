import moment from 'moment'

import Admin from "../components/utilities/badges/Admin"
import SuperAdmin from "../components/utilities/badges/SuperAdmin"
import Lawyer from "../components/utilities/badges/Lawyer"
import Volunteer from "../components/utilities/badges/Volunteer"
import User from "../components/utilities/badges/User"
import Moderator from "../components/utilities/badges/Moderator"

const DATE_FORMAT = 'Do MMM,YY h:s a'

const roles = {
    1: 'Admin',
    2: 'SuperAdmin',
    3: 'User',
    4: 'Volunteer',
    5: 'Lawyer',
    6: 'Moderator'
}

const rolesClass = {
    1: 'text-red-800',
    2: 'text-blue-800',
    3: 'text-pink-800',
    4: 'text-purple-800',
    5: 'text-green-800',
    6: 'text-indigo-800'
}

export const userDrawable = {
    created_at: function(item) {
        let datetime = moment(item.created_at).format(DATE_FORMAT).split(' ')

        let date = datetime[0] + datetime[1]
        let time = datetime[2] + datetime[3]
        return `<span>${date}</span> <span class='text-gray-500'>${time}</span>`
    },
    avatar: function(item) {
        return `<div class="flex justify-center"><img class="w-8 h-8 rounded-full" src="${item.avatar}" /></div>`
    },
    organization: function(item) {
        if(item.plan_id === 'crowdfundly_plan_free') {
            return 1
        }
        if(item.plan_id === 'crowdfundly_plan_a') {
            return 2
        }
        return 6
    },
    subscription_plan: function(item) {
        return item.plan_id
    },
    name: function(item) {
        return `
            <div class="flex justify-start">
                <img class="w-8 h-8 ml-2 rounded-full inline-block align-middle mr-1" src="${item.avatar}" />
                <span class="text-black">${item.name}</span>
            </div>
        `
    },
    subscription_ends_on: function(item) {
        if(item.is_lifetime_subscription) return 'Lifetime'

        if(! item.subscription_ends_on) return null

        let datetime = moment(item.subscription_ends_on).format(DATE_FORMAT).split(' ')

        let date = datetime[0] + datetime[1]
        let time = datetime[2] + datetime[3]

        return `<span>${date}</span> <span class='text-gray-500'>${time}</span>`
    }
}

export const userActions = [
    { text: 'View', icon: 'fas fa-eye', class:'', identifier: 'view' },
    { text: 'Activate', icon: 'fas fa-check', class:'', identifier: 'activate' },
    { text: 'Deactivate', icon: 'fas fa-ban', class:'', identifier: 'deactivate' },
    { text: 'Verify email', icon: 'fas fa-envelope-open', class:'', identifier: 'view' },
]

export const actionRowClass = 'flex flex-col text-left text-xs'

export const headers = [
    'name|draw','email','subscription_plan:Package|draw','organization|draw','subscription_ends_on:Validity|draw','created_at:Joined|draw'
]


