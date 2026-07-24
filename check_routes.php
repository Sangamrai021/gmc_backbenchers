<?php

require __DIR__.'/vendor/autoload.php';

$iterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator(__DIR__.'/app/Http/Controllers'));
$missingViews = [];

foreach ($iterator as $file) {
    if ($file->isFile() && $file->getExtension() === 'php') {
        $content = file_get_contents($file->getPathname());
        preg_match_all("/(?:Inertia::render|inertia)\(['\"]([^'\"]+)['\"]/", $content, $matches);
        foreach ($matches[1] as $viewName) {
            $viewPath = __DIR__.'/resources/js/Pages/' . $viewName . '.jsx';
            if (!file_exists($viewPath)) {
                $missingViews[] = [
                    'file' => str_replace(__DIR__, '', $file->getPathname()),
                    'view' => $viewName
                ];
            }
        }
    }
}
$routesFile = __DIR__.'/routes/web.php';
$content = file_get_contents($routesFile);
preg_match_all("/(?:Inertia::render|inertia)\(['\"]([^'\"]+)['\"]/", $content, $matches);
foreach ($matches[1] as $viewName) {
    $viewPath = __DIR__.'/resources/js/Pages/' . $viewName . '.jsx';
    if (!file_exists($viewPath)) {
        $missingViews[] = [
            'file' => str_replace(__DIR__, '', $routesFile),
            'view' => $viewName
        ];
    }
}

echo "\nMissing Inertia Views in Backend:\n";
print_r($missingViews);
