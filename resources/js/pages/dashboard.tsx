import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { PageProps, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { MjesecniAreaChart } from '@/components/charts/MjesecniAreaChart';
import { Racun, Osoba } from '@/types';

import { usePage } from '@inertiajs/react';



const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];
/*
const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
  ]
  */
  const config = {
    desktop: {
      label: "Prodaja",
      color: "rgb(57, 255, 20)",
    },
    mobile: {
      label: "Kupnja",
      color: "rgb(255, 49, 49)",
    },
  } 
  
export default function Dashboard() {

    const {racuni, primke} = usePage<PageProps>().props;

    const chartData = [];

    console.log(racuni);
    for (let i = 0; i < racuni.length; i++) {
        chartData.push({
            month: racuni[i].datum,
            racun: racuni[i].ukupna_cijena,
            primka: 0,
        });
    }
    for (let i = 0; i < primke.length; i++) {
        chartData.push({
            month: primke[i].datum,
            racun: 0,
            primka: primke[i].ukupna_cijena,
        });
    }

    chartData.sort((a, b) => {
        const aDate = new Date(a.month);
        const bDate = new Date(b.month);
        return aDate.getTime() - bDate.getTime();
    }); 

    let lastPrimka = 0;
    let lastRacun = 0;
    for (let i = 0; i < chartData.length; i++) {
        if (chartData[i].primka === 0) {
            lastRacun += chartData[i].racun;
        } else {
            lastPrimka += chartData[i].primka;
        }

        chartData[i].racun = lastRacun;
        chartData[i].primka = lastPrimka;
    }
/*
    let lastPrimka = 0;
    let lastRacun = 0;
    for (let i = 0; i < chartData.length; i++) {
        if (chartData[i].primka === 0) {
            chartData[i].primka = lastPrimka;
            lastRacun = chartData[i].racun;
        } else {
            chartData[i].racun = lastRacun;
            lastPrimka = chartData[i].primka;
        }
    }

*/


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                    <div className="border-sidebar-border/70     dark:border-sidebar-border relative  rounded-xl border">
                        <MjesecniAreaChart chartConfig={config} chartData={chartData} />
                    </div>
                     <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 rounded-xl border md:min-h-min">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}
