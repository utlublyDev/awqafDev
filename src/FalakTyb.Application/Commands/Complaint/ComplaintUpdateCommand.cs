
using awqaf.Domain;
using MediatR;

namespace awqaf.Application.Commands
{
    public class ComplaintUpdateCommand : IRequest<Complaint>
    {
        public Complaint Complaint { get; set; }
    }
}
