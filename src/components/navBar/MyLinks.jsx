export const links = [
    {
        name: "Ciber Inteligencia",
        submenu: true,
        sublinks: [
            {
                Head: "OSINT",
                sublink: [
                    { name: "RINFA", link: "/dashboard/ciberintg/rinfa" },
                ],
            },
            {
                Head: "Conf Social",
                sublink: [
                    { name: "Tabla", link: "/dashboard/ciberintg/conflictoSocial/tabla" },
                    { name: "Estadística", link: "/dashboard/ciberintg/conflictoSocial/estadistica" },
                    { name: "Matriz factor", link: "/dashboard/ciberintg/conflictoSocial/matrizFactorMes" },
                    { name: "Matriz lugar", link: "/dashboard/ciberintg/conflictoSocial/matrizLugarMes" },
                    { name: "Matriz riesgo", link: "/dashboard/ciberintg/conflictoSocial/matrizRiesgoMes" },
                ],
            },
        ],
    },
    {
        name: "Ciber Contra Inteligencia",
        submenu: true,
        sublinks: [
            {
                Head: "Activos críticos",
                sublink: [
                    { name: "Tabla", link: "/dashboard/ciberci/ac/tabla" },
                    { name: "Nacional", link: "/dashboard/ciberci/ac/nacional" },
                    { name: "Institucional", link: "/dashboard/ciberci/ac/institucional" },
                    { name: "Matriz ACN", link: "/dashboard/ciberci/ac/matrizACNMes" },
                    { name: "Matriz ACI", link: "/dashboard/ciberci/ac/matrizACIMes" },
                ],
            },
            {
                Head: "Categorías",
                sublink: [
                    { name: "Tabla", link: "/dashboard/ciberci/catciberci/tabla" },
                    { name: "Estadística", link: "/dashboard/ciberci/catciberci/estadistica" },
                    { name: "matriz categoría", link: "/dashboard/ciberci/catciberci/matrizCategoria" },
                    { name: "matriz lugar", link: "/dashboard/ciberci/catciberci/matrizLugar" },
                    { name: "matriz riesgo", link: "/dashboard/ciberci/catciberci/matrizRiesgo" },
                ],
            },
        ],
    },
];