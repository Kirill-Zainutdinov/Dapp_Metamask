import {createRouter, createWebHistory} from "vue-router"
import Main from "@/pages/Main"
import BlockPage from "@/pages/BlockPage"
import TxPage from "@/pages/TxPage"

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/block/:blockNumber',
        component: BlockPage
    },
    {
        path: '/transaction/:txHash',
        component: TxPage
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
