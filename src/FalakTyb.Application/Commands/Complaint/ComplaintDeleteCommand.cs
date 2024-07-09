using awqaf.Domain;
using MediatR;

namespace awqaf.Application.Commands
{
    public class ComplaintDeleteCommand : IRequest<Unit>
    {
        public long Id { get; set; }
    }
}
