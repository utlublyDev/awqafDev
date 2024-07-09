using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace awqaf.Domain
{
    [Table("push_notifications")]
    public class PushNotifications : BaseEntity<long>
    {
        [Required]
        public string Header { get; set; }
        public string Details { get; set; }
        public string SentBy { get; set; }
        public DateTime? SentDate { get; set; }

  

        public override bool Equals(object obj)
        {
            if (this == obj) return true;
            if (obj == null || GetType() != obj.GetType()) return false;
            var pushNotifications = obj as PushNotifications;
            if (pushNotifications?.Id == null || pushNotifications?.Id == 0 || Id == 0) return false;
            return EqualityComparer<long>.Default.Equals(Id, pushNotifications.Id);
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Id);
        }

        public override string ToString()
        {
            return "PushNotifications{" +
                    $"ID='{Id}'" +
                    $", Header='{Header}'" +
                    $", Details='{Details}'" +
                    $", SentBy='{SentBy}'" +
                    $", SentDate='{SentDate}'" +
                    "}";
        }
    }
}
