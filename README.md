# kafka-neo4j-stream

## Install
* Kafka 2.1.0 https://www.apache.org/dyn/closer.cgi?path=/kafka/2.1.0/kafka_2.11-2.1.0.tgz
* Neo4j Community Edition 3.4.12 https://neo4j.com/download-center/

## Setup

### Kafka
* Start ZooKeeper server:
``` bash
sh bin/zookeeper-server-start.sh config/zookeeper.properties
```

* Start Kafka server:
``` bash
sh bin/kafka-server-start.sh config/server.properties
```

* Create Topic:
``` bash
sh bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic user-track
```

* Create Comsumer:
``` bash
sh bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic user-track --from-beginning
```

* Create multiple server:
Change `broker.id` and `log.dirs` in `server.properties`


### Neo4j

* Edit `config/neo4j.conf`, add content below:
```
kafka.zookeeper.connect=localhost:2181
kafka.bootstrap.servers=localhost:9092
kafka.acks=1
kafka.num.partitions=1
kafka.retries=2
kafka.batch.size=16384
kafka.buffer.memory=33554432
kafka.reindex.batch.size=1000
kafka.session.timeout.ms=15000
kafka.connection.timeout.ms=10000
kafka.replication=1
kafka.linger.ms=1
kafka.transactional.id=

streams.source.topic.nodes.user-track=action{*}
```

* Start neo4j server:
``` bash
bin/neo4j console
```

* Access Neo4j Browser via http://localhost:7474. Connect to database with neo4j/neo4j and update new password later.

## Create Web UI

* Install AngularJs and Angular Material:
``` html
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-animate.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-route.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-aria.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-messages.min.js"></script>
<script src="https://cdn.gitcdn.link/cdn/angular/bower-material/v1.1.5/angular-material.js"></script>
<link type="text/css" rel="stylesheet" href="https://cdn.gitcdn.link/cdn/angular/bower-material/v1.1.5/angular-material.css" />
```

* Install Neo4j client:
``` html
<script src="js/neo4j-web.min.js"></script>
```

* Connect to neo4j server:
``` js
neo4j = neo4j.v1;
var driver = neo4j.driver('bolt://127.0.0.1:7687', neo4j.auth.basic('neo4j', '123456'));
var session = driver.session();
```

* Create a record:
``` js
var query = `CREATE (n:action {userId: '${USER_ID}', type: '${type}'})`;
var result = session.run(query);
result.then(function(data) {
    console.log(data);
}, function(e) {
    console.log(e)
});
```


