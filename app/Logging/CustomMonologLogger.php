<?php

namespace App\Logging;

use Monolog\Formatter\LineFormatter;
use Monolog\Handler\RotatingFileHandler;
use Monolog\LogRecord;
use Monolog\Logger;

class CustomMonologLogger
{
    /**
     * Create a custom Monolog instance with rich context formatting.
     */
    public function __invoke(array $config): Logger
    {
        $logger = new Logger('monolog_app');

        $path = $config['path'] ?? storage_path('logs/monolog.log');
        $days = $config['days'] ?? 14;
        $level = $config['level'] ?? Logger::DEBUG;

        $handler = new RotatingFileHandler($path, $days, $level);

        // Standardized line format: [Timestamp] Channel.LEVEL: Message {context} {extra}
        $output = "[%datetime%] %channel%.%level_name%: %message% %context% %extra%\n";
        $formatter = new LineFormatter($output, 'Y-m-d H:i:s', true, true);

        $handler->setFormatter($formatter);
        $logger->pushHandler($handler);

        // Add custom Monolog processor to attach request & user metadata to every log record
        $logger->pushProcessor(function ($record) {
            $request = request();
            $user = auth()->user();

            $extraMetadata = [
                'ip' => $request ? $request->ip() : 'cli',
                'method' => $request ? $request->method() : 'cli',
                'url' => $request ? $request->fullUrl() : 'cli',
                'user_id' => $user ? $user->id : null,
                'user_email' => $user ? $user->email : null,
            ];

            if ($record instanceof LogRecord) {
                return $record->with(extra: array_merge($record->extra, $extraMetadata));
            }

            if (is_array($record)) {
                $record['extra'] = array_merge($record['extra'] ?? [], $extraMetadata);
                return $record;
            }

            return $record;
        });

        return $logger;
    }
}
